import { quickSort } from './quicksort';

test('throws an error when the input is not an array', () => {
  expect(() => {
    quickSort('hello');
  }).toThrowError('Can only sort arrays');   
});

test('throws an error when the input is not an array', () => {
  expect(() => {
    quickSort('1234');
  }).toThrowError('Can only sort arrays');   
});

test('throws an error when the input is not an array', () => {
  expect(() => {
    quickSort({ foo: 'bar' });
  }).toThrowError('Can only sort arrays');   
});

test('throws an error when the input is not an array', () => {
  expect(() => {
    quickSort(null);
  }).toThrowError('Can only sort arrays');   
});

test('returns an empty array when given an empty array', () => {
  expect(quickSort([])).toEqual([]);
});

test('returns the input when given an array with one value', () => {
  expect([3]).toEqual([3]);
});

test('returns the input sorted when given two or more values without a comparator', () => {
  const inputData = [3, 4];
  const expected = [3, 4];
  expect(quickSort(inputData)).toEqual(expected);
});

test('returns the input sorted when given two or more values without a comparator', () => {
  const inputData = [4, 2];
  const expected = [2, 4];
  expect(quickSort(inputData)).toEqual(expected);
});

test('returns the input sorted when given two or more values without a comparator', () => {
  const inputData = [3, 1, 5];
  const expected = [1, 3, 5];
  expect(quickSort(inputData)).toEqual(expected);
});

test('returns the input sorted when given two or more values without a comparator', () => {
  const inputData = [3, 5, 1, 6];
  const expected = [1, 3, 5, 6];
  expect(quickSort(inputData)).toEqual(expected);
});

test('returns the input sorted when given two or more values without a comparator', () => {
  const inputData = [3, 5, 1, 6, 9, -1, 4, 2, 8, 5, 7, 0];
  const expected = [-1, 0, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9];
  expect(quickSort(inputData)).toEqual(expected);
});

test('returns the input sorted when given an array of objects', () => {
  const inputData = [
    { name: 'bar' },
    { name: 'foo' },
    { name: 'baz' }
  ];

  const expected = [
    { name: 'bar' },
    { name: 'baz' },
    { name: 'foo' }
  ];

  expect(quickSort(inputData, (a, b) => a.name < b.name)).toEqual(expected);
});

test('returns the input sorted when given an array of objects', () => {
  const inputData = [
    { name: 'bar', age: 12 },
    { name: 'foo', age: 21 },
    { name: 'baz', age: 4 }
  ];

  const expected = [
    { name: 'bar', age: 12 },
    { name: 'baz', age: 4 },
    { name: 'foo', age: 21 }
  ];

  expect(quickSort(inputData, (a, b) => a.name < b.name)).toEqual(expected);
});

test('returns the input sorted when given an array of objects', () => {
  const inputData = [
    { name: 'bar', age: 12 },
    { name: 'foo', age: 21 },
    { name: 'baz', age: 4 }
  ];

  const expected = [
    { name: 'baz', age: 4 },
    { name: 'bar', age: 12 },
    { name: 'foo', age: 21 }
  ];

  expect(quickSort(inputData, (a, b) => a.age < b.age)).toEqual(expected);
});
