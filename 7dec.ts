import getData from './data';
import getCombinations from './helpers/heap';
import generate from './helpers/heap';

const [_ts, _file, date, test] = process.argv;

interface Data {
  result: string;
  data: string[];
}

const data: Data[] = getData(date, test)
  .split('\n')
  .map((e) => e.split(': '))
  .map((e) => ({
    result: e[0],
    data: e[1].split(' '),
  }));
console.log(data);

const operators = ['+', '*'];

console.time('part 1');

const result = getCombinations(data[1].data);
console.log(result);

console.timeEnd('part 1');
console.log('part1');

console.time('part 2');
console.timeEnd('part 2');
console.log('part2');
