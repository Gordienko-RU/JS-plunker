const { callCounter } = require('./class-member-decorator');

let counter = {
  value: 0,
  increase() {
    this.value++;
  },
};

class Box {
  constructor() {
    this.opened = true;
  }

  @callCounter(counter)
  open() {
    this.opened = true;
  }

  @callCounter(counter)
  close() {
    this.opened = close;
  }
}

describe('class-member decorator', () => {
  it('counts method calls', () => {
    const box = new Box();
    box.open();
    box.close();

    expect(counter.value).toBe(2);
  })
});
