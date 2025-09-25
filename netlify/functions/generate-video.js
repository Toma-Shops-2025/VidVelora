const https = require('https');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt, duration, style, aspect_ratio } = JSON.parse(event.body);
    
    // Check if API key exists
    const apiKey = process.env.RUNWAY_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'RunwayML API key not found in environment variables'
        })
      };
    }

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
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          console.log('RunwayML API Response:', {
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });

          if (res.statusCode !== 200) {
            resolve({
              statusCode: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({ 
                error: `Runway API error: ${res.statusCode} ${res.statusMessage}`,
                details: data,
                debug: {
                  apiKeyLength: apiKey.length,
                  prompt: prompt,
                  requestBody: postData
                }
              })
            });
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
            resolve({
              statusCode: 500,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({ 
                error: `Failed to parse RunwayML response: ${parseError.message}`,
                rawResponse: data,
                debug: {
                  apiKeyLength: apiKey.length,
                  prompt: prompt
                }
              })
            });
          }
        });
      });

      req.on('error', (error) => {
        console.error('RunwayML API Request Error:', error);
        resolve({
          statusCode: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ 
            error: `RunwayML API request failed: ${error.message}`,
            debug: {
              apiKeyLength: apiKey.length,
              prompt: prompt
            }
          })
        });
      });

      req.write(postData);
      req.end();
    });

  } catch (error) {
    console.error('Netlify Function Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack
      })
    };
  }
};