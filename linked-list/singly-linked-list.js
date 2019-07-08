class Node {
  constructor({ item, next }) {
    this.item = item;
    this.next = next;
  }
};

class LinkedList {
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

  traverse(cb) {
    let reference = this.head;

    while(reference) {
      cb(reference.item);
      reference = reference.next;
    };
  }
};

const list = new LinkedList();
list.setHead('head');
list.addElement('first');
list.addElement('second');

list.traverse(console.log);
