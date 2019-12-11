const fs = require('fs');
const { Readable } = require('stream');

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
  it('create stream from async iterator', async () => {
    async function* generate() {
      yield 'test';
    }

    const readableStream = Readable.from(generate());

    readableStream.on('data', chunk => expect(chunk).toBe('test'));
  })
})

