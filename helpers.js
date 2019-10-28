function measureTime(subject, cb, ...params) {
  const start = window.performance.now();
  subject ? subject[cb](...params) : cb(...params);
  const finish = window.performance.now();

  return finish - start;
}

module.exports = {
  measureTime,
}
