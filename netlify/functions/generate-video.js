const https = require('https');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt, duration, style, aspect_ratio } = JSON.parse(event.body);
    
    // Use Node.js https module instead of fetch
    const postData = JSON.stringify({
      prompt,
      duration: duration || 4,
      style: style || 'cinematic',
      aspect_ratio: aspect_ratio || '16:9',
      quality: 'high'
    });

    const options = {
      hostname: 'api.runwayml.com',
      port: 443,
      path: '/v1/gen4_turbo/video/generate',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Runway API error: ${res.statusCode} ${res.statusMessage}`));
            return;
          }
          
          try {
            const result = JSON.parse(data);
            resolve({
              statusCode: 200,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
              },
              body: JSON.stringify({
                id: result.id,
                status: 'pending',
                video_url: result.video_url,
                thumbnail_url: result.thumbnail_url,
                duration: result.duration
              })
            });
          } catch (parseError) {
            reject(new Error(`Failed to parse response: ${parseError.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};