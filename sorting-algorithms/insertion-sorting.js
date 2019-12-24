/**
 * @param {Array<*>} arr 
 * @param {Function} validate - to compare to elements and decide is order valid
 */
function insertionSorting(arr, validate) {
  for (let i = 1; i <= arr.length; i++) {
    const portion = arr.slice(0, i);
    let firstViolation = null;

    for (let j = 0; j < portion.length; j++) {
      if (!validate(arr[i], portion[j])) {
        firstViolation = j;
      }
    }

    if (firstViolation) {
      arr.splice(firstViolation, 0, arr[i]);
      arr.splice(i, 1);
    }
  }

  return arr;
}
