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

const initialItemKey = Symbol('initialItem');

// NOTE: Will be used as second level store instead of Linked List to implement chaining strategy.
class SecondLevelDictionary {
  constructor() {
    this.keys = [];
    this.values = [];
  }

  set(key, value) {
    this.keys.push(key);
    this.values.push(value);
  }

  get(key) {
    const targetKey = this.keys.findIndex(item => item === key);

    // NOTE: If valueByKey is undefined it means we looking for first value which were stored here,
    // or there is no such value in bucket
    // TODO: Currently, if there is no looked key in bucket, initial value will be returned,
    // think about is it a problem, if yes, how it could be fixed
    return this.values[targetKey === -1 ? initialItemKey : targetKey];
  }
}

// NOTE: Collisions resolution method - chaining.
class HashTable {
  constructor() {
    this.store = [];
  }

  /**
   * @param {string} key 
   * @param {*} value 
   * @param {number} [testIndex] for test purposes only
   */
  set(key, value, testIndex) {
    const hash = testIndex || generateHash(key);
    const store = this.store;

    if (!store[hash]) {
      store[hash] = value;

      return;
    }

    if (store[hash] instanceof SecondLevelDictionary) {
      store[hash].set(key, value);

      return;
    }

    // NOTE: It's not needed to use SecondLevelDictionary if there is only one item in bucket
    const bucketDictionary = new SecondLevelDictionary();
    bucketDictionary.set(initialItemKey, store[hash]);
    bucketDictionary.set(key, value);

    store[hash] = bucketDictionary;
  }

  /**
   * @param {string} key 
   * @param {number} [testIndex] for test purposes only 
   * @param {Function} [valueChecker] for test purposes only 
   */
  get(key, testIndex, valueChecker) {
    const bucket = this.store[testIndex || generateHash(key)];

    if (valueChecker) {
      valueChecker(this.store[testIndex]);
    }

    if (bucket instanceof SecondLevelDictionary) {
      return bucket.get(key);
    }

    return bucket;
  }
}

describe('hashFunction', () => {
  it('return the same hash for same keys', () => {
    expect(generateHash('test')).toBe(generateHash('test'));
  })
  it('return different hash for different keys', () => {
    expect(generateHash('test1') !== generateHash('test1'));
  })
  it('return number', () => {
    expect(typeof generateHash('test')).toBe('number');
  })
})

let hashTable = null;

describe('HashTable', () => {
  beforeEach(() => {
    hashTable = new HashTable();
  })

  it('set and access value by key', () => {
    hashTable.set('testKey', 'testValue');
    expect(hashTable.get('testKey')).toBe('testValue');
  })

  it('doesn\'t create second level store if there is only one value in bucket', () => {
    let fromBucket = null;

    hashTable.set('key', 'test', 1);
    hashTable.get('key', 1, value => fromBucket = value)

    expect(typeof fromBucket).toBe('string');
  })

  it('creates second level storage if there are several items in one bucket', () => {
    let fromBucket = null;

    hashTable.set('key', 'test', 1);
    hashTable.set('key', 'test1', 1);
    hashTable.get('key', 1, value => fromBucket = value);

    expect(fromBucket['__proto__']).toBe(SecondLevelDictionary.prototype);
  })
})
