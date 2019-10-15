function callCounter(_, name, descriptor) {
  let counter = 0;
  const originalHandler = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`${name} called in ${counter} time`);
    return originalHandler.call(this, args);
  };

  return descriptor;
}

class Box {
  constructor() {
    this.open = true;
  }

  @callCounter
  open() {
    this.open = true;
  }

  @callCounter
  close() {
    this.open = close;
  }
}
