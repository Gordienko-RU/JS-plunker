const DoublyLinkedList = require('./doubly-linked-list');

let doublyLinkedList = null;

const initializeList = () => {
  doublyLinkedList = new DoublyLinkedList();
  doublyLinkedList.add('1');
  doublyLinkedList.add('2');
  doublyLinkedList.add('3');
}

describe('Doubly linked list:', () => {
  beforeEach(() => initializeList());

  it('gets elements by index', () => {
    expect(doublyLinkedList.get(0)).toEqual('1');
    expect(doublyLinkedList.get(1)).toEqual('2');
    expect(doublyLinkedList.get(2)).toEqual('3');
  });

  it('iterates trhough list', () => {
    let i = 0;

    for(let data of doublyLinkedList) {
      expect(data).toEqual(`${++i}`);
    }
  });

  it('deletes element by index from list', () => {
    doublyLinkedList.delete(1);

    expect(doublyLinkedList.get(0)).toEqual('1');
    expect(doublyLinkedList.get(1)).toEqual('3');
  });
});