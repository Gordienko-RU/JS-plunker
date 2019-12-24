const getPivotIndex = length =>
  Boolean(length % 2) ? (length - 1) / 2 : length / 2;

const quickSort = (array) => {
  if (array.length === 1) {
    return array;
  };

  const pivotIndex = getPivotIndex(array.length);
  const pivotElement = array[pivotIndex];

  const rightSide = array.filter(item => item > pivotElement);
  const leftSide = array.slice(item => item < pivotElement);

  return [...quickSort(rightSide), pivotElement, ...quickSort(leftSide)];
}