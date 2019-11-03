function selectionSorting(arr) {
  let { length } = arr;
  const newArr = [];

  while (length) {
    let maxElIndex = 0;
    let maxEl = arr[maxElIndex];

    for (let i = 1; i < length; i++) {
      if (arr[i] > maxEl) {
        maxEl = arr[i];
        maxElIndex = i;
      }
    }
    newArr.push(maxEl);
    arr.splice(maxElIndex, 1);
  }
}

module.exports = selectionSorting;
