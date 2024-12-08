import getData from './data';

const [_ts, _file, date, test] = process.argv;
const data: string[][] = getData(date, test)
  .split('\n')
  .map((e) => e.split(''));

interface Position {
  x: number;
  y: number;
}
let grid: Map<Position, string> = new Map();
let position: Position;

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] !== '.') {
      grid.set({ x: j, y: i }, data[i][j]);
    }
    if (data[i][j] === '^') {
      const position = { x: j, y: i };
    }
  }
}

console.time('part 1');
console.timeEnd('part 1');
console.log('part1');

console.time('part 2');
console.timeEnd('part 2');
console.log('part2');
