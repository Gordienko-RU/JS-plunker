class DoublyLinkedNode {
  constructor({ previous, data, next }) {
    this.previous = previous;
    this.data = data;
    this.next = next;
  }
}

const head = Symbol('head');
const tail = Symbol('tail');

// iterable List with basic functionality
// TODO: populate with new methods
class DoublyLinkedList {
  constructor() {
    this[head] = null;
    this[tail] = null;
  }

  add(data) {
    const node = new DoublyLinkedNode({
      previous: this[tail],
      data,
      next: null,
    });

    if (!this[head]) {
      this[head] = node;
      this[tail] = node;

      return node;
    }
    this[tail].next = node;
    this[tail] = node;

    return node;
  }

  get(index) {
    let i = 0;
    let current = this[head];

    while(current && i !== index) {
      current = current.next;
      i++;
    }

    return current ? current.data : null;
  }

  delete(index) {
    let i = 0;
    let current = this[head];

    while(current && i !== index) {
      current = current.next;
      i++;
    }

    if (current) {
      const { previous, next } = current;

      previous.next = next;

      if (next) {
        next.previous = previous;
      }
    }
  }

  *values() {
    let current = this[head];

    while(current) {
      yield current.data;
      current = current.next;
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }
}

module.exports = DoublyLinkedList;
