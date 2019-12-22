const fs = require('fs');
const { Readable, finished, pipeline } = require('stream');
const { promisify } = require('util');
const { once } = require('events');
const { createGzip } = require('zlib');

async function handleChunks(cb, stream) {
  for await(const chunk of stream) {
    cb(chunk);
  }
}

const whenFinish = promisify(finished);

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

  it('creates simple write stream', async () => {
    const writableStream = fs.createWriteStream('./node-related/stream.test2.txt');

    writableStream.write('content');
    writableStream.end();
    await whenFinish(writableStream);

    const readableStream = fs.createReadStream('./node-related/stream.test2.txt');
    let content = '';
    
    await handleChunks(chunk => content += chunk, readableStream);
    expect(content).toBe('content');
  })

  it('create write stream from iterator', async () => {
    async function writeIterableToFile(iterable, pathToFile) {
      const writableStream = fs.createWriteStream(pathToFile);

      for await(const chunk of iterable) {
        if(!writableStream.write(chunk)) {
          await once(writableStream, 'drain');
        };
      }
      writableStream.end();

      await whenFinish(writableStream);
    };

    await writeIterableToFile(['data', 'data', 'data'], './node-related/stream.test3.txt');

    const readableStream = fs.createReadStream('./node-related/stream.test3.txt');
    let content = '';
    
    await handleChunks(chunk => content += chunk, readableStream);
    expect(content).toBe('datadatadata');
  })

  it('read -> gzip -> write to destination pipeline', async () => {
    const pipe = promisify(pipeline);

    const err = await pipe(
      fs.createReadStream('./node-related/stream.test3.txt'),
      createGzip(),
      fs.createWriteStream('./node-related/stream.test3.txt.gz'),
    );
    
    expect(!err);
  })
})

