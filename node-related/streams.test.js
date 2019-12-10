const fs = require('fs');

async function handleChunks(cb, stream) {
  for await(const chunk of stream) {
    cb(chunk);
  }
}

describe('streams', () => {
  it('handles readable stream', async () => {
    const readableStream = fs.createReadStream(
      './node-related/stream.test.txt',
      {
        encoding: 'utf-8',
        highWaterMark: 2,
      },
    );
    let content = '';
    
    await handleChunks(chunk => content += chunk, readableStream);
    expect(content).toBe('test');
  })
})

