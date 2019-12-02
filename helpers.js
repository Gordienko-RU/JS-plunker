/**
 * @param {Object} subject // any object on which cb should be called 
 * @param {Function | string} cb // string for method name, if subject is set
 * @param  {*} params 
 */
function measureTime(subject, cb, ...params) {
  const start = window.performance.now();
  subject ? subject[cb](...params) : cb(...params);
  const finish = window.performance.now();

  return finish - start;
}

module.exports = {
  measureTime,
}
