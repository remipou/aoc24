import getData from './data';

const [_ts, _file, date, test] = process.argv;
const data: number[][] = getData(date, test)
  .split('\n')
  .map((e) => e.split(' ').map((e) => parseInt(e)));

console.time('part 1');

const processReport = (report: number[]): boolean => {
  const res: number[] = [];
  for (let i = 1; i < report.length; i++) {
    res.push(report[i] - report[i - 1]);
  }
  if (res.filter((e) => Math.abs(e) > 3 || Math.abs(e) === 0).length > 0) {
    return false;
  }
  const directions = res.map((e) => e === Math.abs(e));
  if ([...new Set(directions)].length > 1) {
    return false;
  }
  return true;
};

let result = 0;
for (let i = 0; i < data.length; i++) {
  if (processReport(data[i])) {
    result = result + 1;
  }
}
console.timeEnd('part 1');
console.log('part1', result);

const processPart2 = (report: number[]): boolean => {
  if (processReport(report)) {
    return true;
  }
  for (let i = 0; i < report.length; i++) {
    if (processReport(report.filter((_e, k) => k !== i))) {
      return true;
    }
  }
  return false;
};

console.time('part 2');

let result2 = 0;
for (let i = 0; i < data.length; i++) {
  if (processPart2(data[i])) {
    result2 = result2 + 1;
  }
}

console.timeEnd('part 2');
console.log('part2', result2);
