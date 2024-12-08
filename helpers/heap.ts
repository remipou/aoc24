// https://en.wikipedia.org/wiki/Heap%27s_algorithm

const swap = (a: unknown[], i: number, j: number): unknown[] => {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
  return a;
};

const generate = (
  array: unknown[],
  k: number | null = null,
  callback: (a: unknown[]) => void
): void => {
  k = k || array.length;
  if (k === 1) {
    callback(array);
  } else {
    generate(array, k - 1, callback);
    for (let i = 0; i < k - 1; i++) {
      if (k % 2) {
        array = swap(array, i, k - 1);
      } else {
        array = swap(array, 0, k - 1);
      }
      generate(array, k - 1, callback);
    }
  }
};

const getCombinations = (array: unknown[]): unknown[] => {
  let res: unknown[] = [];
  const cb = (a: unknown[]) => {
    res = [...res, [...a]];
  };
  generate(array, null, cb);
  return res;
};

export default getCombinations;
