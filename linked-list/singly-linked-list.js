class Node {
  constructor({ item, next }) {
    this.item = item;
    this.next = next;
  }
};

// TODO: add tests
class UnprotectedLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHead(item) {
    this.head = new Node({ item, next: this.tail });
    
    if (!this.tail) {
      this.tail = this.head;
    };

    return this.head;
  }

  addElement(item) {
    // TODO: make this check before each attempt to interact with list
    // using Proxy trap
    if (!this.head) {
      throw new Error('Head not setted');
    };
    const isFirstElement = !this.tail;
    const newNode = new Node({ item, next: null });
    this.tail.next = newNode;
    this.tail = newNode;

    if (isFirstElement) {
      this.head.next = this.tail;
    };

    return this.tail;
  }


  // TODO: think about DRY across methods below
  traverse(cb) {
    let reference = this.head;
    let currentIndex = 0;

    while(reference) {
      cb(reference.item, currentIndex, this);
      reference = reference.next;
      currentIndex++;
    };
  }

  get(index) {
    let reference = this.head;
    let currentIndex = 0;

    while(reference) {
      if (index === currentIndex) {
        return reference.item;
      }
      reference = reference.next;
      currentIndex++;
    };

    return null;
  }

  delete(index) {
    let reference = this.head;
    let prevReference = null;
    let currentIndex = 0;

    while(reference) {
      if (index === currentIndex) {
        if (prevReference) {
          prevReference.next = reference.next;
        }

        return reference.item;
      }
      prevReference = reference;
      reference = reference.next;
      currentIndex++;
    };

    return null;
  }
};

const proxyHandlers = {
  get: (target, key) => {
    if (['get', 'delete', 'traverse', 'addElement'].includes(key)) {
      if (!target.head) {
        throw new Error('HEAD is not set');
      }
    }
  }
}

module.exports = class LinkedList {
  constructor() {
    return new Proxy(new UnprotectedLinkedList(), proxyHandlers);
  }
}
