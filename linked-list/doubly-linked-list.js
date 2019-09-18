class DoublyLinkedNode {
  constructor({ previous, data, next }) {
    this.previous = previous;
    this.data = data;
    this.next = next;
  }
}

const head = Symbol('head');
const tail = Symbol('tail');

class DoublyLinkedList {
  [head] = null;
  [tail] = null;

  add(data) {
    const node = new DoublyLinkedNode({
      previous: this[tail],
      data,
      next: null,
    });

    if (!head) {
      this[head] = node;
      this[tail] = node;

      return node;
    }
    this.tail.next = node;

    return node;
  }

  get(index) {
    let i = 0;
    let current = this[head];

    while(current && ++i !== index) {
      current = current.next;
    }

    return current;
  }

  delete(index) {
    const targetNode = this.get(index);

    if (targetNode) {
      const { previous, next } = targetNode;

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
