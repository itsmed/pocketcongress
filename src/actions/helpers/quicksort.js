export function quickSort(list, callback) {
  
  const compare = callback || function(a, b) {
    return a < b;
  };

  if (!Array.isArray(list)) {
    throw new Error('Can only sort arrays');
  }

  if (list.length < 2) {
    return list;
  }

  list = list.slice(0);
  const pivot = list.pop();
  const left = [];
  const right = [];

  for (let i = 0; i < list.length; i++) {
    if (compare(list[i], pivot)) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }

  return [...quickSort(left, compare), pivot, ...quickSort(right, compare)];

}
