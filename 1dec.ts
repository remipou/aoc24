import getData from './data';

const [_ts, _file, date, test] = process.argv;
const data: string[][] = getData(date, test)
  .split('\n')
  .map((e) => e.split(/\s+/));

const serie1: number[] = data.map((e) => parseInt(e[0]));
const serie2: number[] = data.map((e) => parseInt(e[1]));

const serie1copy = [...serie1];
const serie2copy = [...serie2];

console.time('part 1');
const result: number[] = [];
const length: number = serie1.length;
for (let i = 0; i < length; i++) {
  const min1 = Math.min(...serie1);
  const min2 = Math.min(...serie2);
  result.push(Math.abs(min1 - min2));
  serie1.splice(
    serie1.findIndex((e) => e === min1),
    1
  );
  serie2.splice(
    serie2.findIndex((e) => e === min2),
    1
  );
}
console.timeEnd('part 1');
console.log(
  'part1',
  result.reduce((p: number, c: number) => c + p, 0)
);

console.time('part 2');
const result2: number[] = [];
for (let i = 0; i < serie1copy.length; i++) {
  const matches = serie2copy.reduce((p: number[], c: number) => {
    if (c === serie1copy[i]) {
      p.push(serie1copy[i]);
    }
    return p;
  }, []);
  result2.push(serie1copy[i] * matches.length);
}

console.timeEnd('part 2');
console.log(
  'part2',
  result2.reduce((p: number, c: number) => c + p, 0)
);
