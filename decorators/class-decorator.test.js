const { protectFromWrite } = require('./class-decorator');

@protectFromWrite
class Box {
  constructor() {
    this.opened = false;
  }

  open() {
    this.opened = true;
  }
}

describe('class decorator', () => {
  it('class properties protected from write', () => {
    const box = new Box();
    const reasignOpenMethod = () => {
      box.open = () => {};
    }
    
    expect(reasignOpenMethod).toThrow();
  })
});
