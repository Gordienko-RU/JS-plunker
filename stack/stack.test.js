const Stack = require('./stack');

let stack = null;
const initializeStack = () => {
  stack = new Stack();
  stack.push(0);
  stack.push(1);
}

describe('Stack', () => {
  beforeEach(initializeStack);

  it('push element', () => {
    expect(stack.push(2)).toEqual(3);
  });

  it('pop element', () => {
    expect(stack.pop()).toEqual(1);
  });
  
  it('get top element', () => {
    expect(stack.top()).toEqual(1);
  });

  it('check is empty', () => {
    expect(stack.isEmpty()).toEqual(false);
    stack.pop();
    stack.pop();
    expect(stack.isEmpty()).toEqual(true);
  });
})