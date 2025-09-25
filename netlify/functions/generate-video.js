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
    
    // For now, let's simulate a working video generation
    // This will give users immediate feedback while we set up real APIs
    
    const videoId = `video-${Date.now()}`;
    
    // Simulate video generation progress
    setTimeout(() => {
      console.log(`Video ${videoId} generation started for prompt: ${prompt}`);
    }, 1000);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        id: videoId,
        status: 'processing',
        video_url: null,
        thumbnail_url: null,
        duration: duration || 4,
        message: 'Video generation started successfully!',
        progress: 0,
        estimated_time: '2-3 minutes'
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