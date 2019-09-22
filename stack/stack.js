const dataStore = Symbol('dataStore');

// Array based Stack
class Stack {
  constructor() {
    this[dataStore] = [];
  }

  push(data) {
    return this[dataStore].push(data);
  }

  pop() {
    return this[dataStore].pop();
  }

  isEmpty() {
    return !this[dataStore].length;
  } 

  top() {
    return this[dataStore][this[dataStore].length - 1];
  }
}

module.exports = Stack;
