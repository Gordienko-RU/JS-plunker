import LinkedList from '../linked-list/doubly-linked-list';

const generateHash = (key) => {
  var hash = 0;

  if (key.length == 0) return hash;

  for (var i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash;
      hash = hash + key.charCodeAt(i);
      hash = hash & hash;
  }

  return Math.abs(hash);
}

// NOTE: Collisions resolution method - chaining.
class HashTable {
  store = [];

  set(key, value) {
    this.store[generateHash(key)] = value;
  }

  get(key) {
    return this.store[generateHash(key)];
  }
}