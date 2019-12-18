const util = require('util');

function wait(delay, cb) {
  setTimeout(() => cb(null, 'test'), delay);
}

describe('promisification', () => {
  it('transforms callback based function to promise',async () => {
    const promisifiedWait = util.promisify(wait);
    expect(await promisifiedWait(1000)).toBe('test');
  })
  it('calls custom function if defined', async () => {
    function customPromiseBasedHandler(delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('test');
        }, delay);
      });
    }

    wait[util.promisify.custom] = customPromiseBasedHandler;

    const promisifiedWait = util.promisify(wait);
    expect(promisifiedWait === customPromiseBasedHandler);
    expect(await promisifiedWait(1000)).toBe('test');
  })
});
