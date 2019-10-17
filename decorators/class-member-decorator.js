function callCounter(counter) {
  return function(target) {
    const originalHandler = target.descriptor.value;
    const { descriptor } = target;

    descriptor.value = function(...args) {
      counter.increase();
      return originalHandler.call(this, ...args);
    };

    return { ...target, descriptor };
  }
}

module.exports = { callCounter }
