import getData from './data';

const [_ts, _file, date, test] = process.argv;
const data: string[][] = getData(date, test)
  .split('\n')
  .map((l) => l.split(''));
// console.log(data);

interface Pos {
  x: number;
  y: number;
}

const r1 = /XMAS/g;
const r2 = /SAMX/g;

const findInString = (str: string): number => {
  const c1 = [...str.matchAll(r1)].length;
  const c2 = [...str.matchAll(r2)].length;
  // console.log(str, c1, c2);
  return c1 + c2;
};

const makeString = (start: Pos, reverse: boolean = false): string | null => {
  let str = data[start.y][start.x];
  const pos: Pos = { ...start };
  if (reverse) {
    while (pos.y < data[0].length - 1 && pos.x > 0) {
      pos.x = pos.x - 1;
      pos.y = pos.y + 1;
      str += data[pos.y][pos.x];
    }
  } else {
    while (pos.x < data[0].length - 1 && pos.y < data.length - 1) {
      pos.x = pos.x + 1;
      pos.y = pos.y + 1;
      str += data[pos.y][pos.x];
    }
  }
  return str.length > 3 ? str : null;
};

console.time('part 1');

let count = 0;
for (let i = 0; i < data.length; i++) {
  count = count + findInString(data[i].join(''));
}
for (let i = 0; i < data[0].length; i++) {
  count = count + findInString(data.map((l) => l[i]).join(''));
}
for (let i = 0; i < data.length; i++) {
  const str = makeString({ x: 0, y: i });
  const str3 = i > 0 ? makeString({ x: i, y: 0 }) : null;

  const str2 = makeString({ x: data[0].length - 1, y: i }, true);
  const str4 =
    i > 0 ? makeString({ x: data[0].length - 1 - i, y: 0 }, true) : null;

  if (str) {
    count = count + findInString(str);
  }
  if (str2) {
    count = count + findInString(str2);
  }
  if (str3) {
    count = count + findInString(str3);
  }
  if (str4) {
    count = count + findInString(str4);
  }
}

console.timeEnd('part 1');
console.log('part1', count);

console.time('part 2');
let countPart2 = 0;
for (let i = 1; i < data.length - 1; i++) {
  for (let j = 1; j < data[0].length - 1; j++) {
    if (data[i][j] === 'A') {
      if (
        (data[i - 1][j - 1] === 'M' && data[i + 1][j + 1] === 'S') ||
        (data[i - 1][j - 1] === 'S' && data[i + 1][j + 1] === 'M')
      ) {
        if (
          (data[i - 1][j + 1] === 'M' && data[i + 1][j - 1] === 'S') ||
          (data[i - 1][j + 1] === 'S' && data[i + 1][j - 1] === 'M')
        ) {
          countPart2 = countPart2 + 1;
        }
      }
    }
  }
}
console.timeEnd('part 2');
console.log('part2', countPart2);
