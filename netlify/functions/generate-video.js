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
    
    // Try multiple video generation APIs in order of preference
    const apis = [
      {
        name: 'Pika Labs',
        hostname: 'api.pika.art',
        path: '/v1/video/generate',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          prompt,
          duration: duration || 4,
          style: style || 'cinematic',
          aspect_ratio: aspect_ratio || '16:9'
        }
      },
      {
        name: 'Luma AI',
        hostname: 'api.lumalabs.ai',
        path: '/v1/video/generate',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          prompt,
          duration: duration || 4,
          style: style || 'cinematic',
          aspect_ratio: aspect_ratio || '16:9'
        }
      }
    ];

    // Try each API until one works
    for (const api of apis) {
      try {
        console.log(`Trying ${api.name}...`);
        
        const postData = JSON.stringify(api.body);
        const options = {
          hostname: api.hostname,
          port: 443,
          path: api.path,
          method: 'POST',
          headers: {
            ...api.headers,
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const result = await new Promise((resolve, reject) => {
          const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
              data += chunk;
            });
            
            res.on('end', () => {
              if (res.statusCode === 200) {
                try {
                  const parsed = JSON.parse(data);
                  resolve({
                    success: true,
                    data: parsed,
                    api: api.name
                  });
                } catch (parseError) {
                  resolve({
                    success: false,
                    error: `Failed to parse ${api.name} response: ${parseError.message}`,
                    api: api.name
                  });
                }
              } else {
                resolve({
                  success: false,
                  error: `${api.name} API error: ${res.statusCode} ${res.statusMessage}`,
                  api: api.name
                });
              }
            });
          });

          req.on('error', (error) => {
            resolve({
              success: false,
              error: `${api.name} request failed: ${error.message}`,
              api: api.name
            });
          });

          req.write(postData);
          req.end();
        });

        if (result.success) {
          console.log(`Success with ${api.name}!`);
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
              id: result.data.id || `video-${Date.now()}`,
              status: 'pending',
              video_url: result.data.video_url,
              thumbnail_url: result.data.thumbnail_url,
              duration: result.data.duration || 4,
              api_used: api.name,
              message: `Video generation started using ${api.name}`
            })
          };
        } else {
          console.log(`${api.name} failed:`, result.error);
        }
      } catch (error) {
        console.log(`${api.name} error:`, error.message);
      }
    }

    // If all APIs failed, return a mock response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        id: `mock-video-${Date.now()}`,
        status: 'pending',
        video_url: null,
        thumbnail_url: null,
        duration: 4,
        api_used: 'Mock',
        message: 'All video APIs failed - using mock response for testing'
      })
    };

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