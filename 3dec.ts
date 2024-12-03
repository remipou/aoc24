import getData from './data';

const [_ts, _file, date, test] = process.argv;
const data: string = getData(date, test);

console.time('part 1');

const instructions = data.match(/mul\(\d+\,\d+\)/g);

const regexp = /mul\((\d+)\,(\d+)\)/;

const processSection = (section: string): number => {
  const matches = regexp.exec(section);
  if (matches && matches?.length > 2) {
    return parseInt(matches[1], 10) * parseInt(matches[2], 10);
  }
  return 0;
};

const results = instructions?.map((i) => processSection(i));
const result = results
  ?.filter((e) => e)
  .reduce((p: number, c: number) => p + c, 0);

console.timeEnd('part 1');
console.log('part1', result);

console.time('part 2');

const regexp2 = /(do\(\))|(don't\(\))|(mul\(\d+,\d+\))/g;
const matches = [...data.matchAll(regexp2)];

let enabled: boolean = true;
const results2: number[] = [];

for (let i = 0; i < matches.length; i++) {
  if (matches[i][0] === "don't()") {
    enabled = false;
  } else if (matches[i][0] === 'do()') {
    enabled = true;
  } else if (matches[i][0].match(/mul\(\d+\,\d+\)/)) {
    const res = processSection(matches[i][0]);
    if (enabled) {
      results2.push(res);
    }
  }
}

const result2 = results2.reduce((p: number, c: number) => p + c, 0);

console.timeEnd('part 2');
console.log('part2', result2);
