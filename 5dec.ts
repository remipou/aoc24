import getData from './data';

const [_ts, _file, date, test] = process.argv;
const data: string[] = getData(date, test).split('\n\n');

type Rule = [number, number];
type Update = number[];
const rules = data[0]
  .split('\n')
  .map((e: string) => e.split('|').map((s) => parseInt(s))) as Rule[];
const updates: Update[] = data[1]
  .split('\n')
  .map((e: string) => e.split(',').map((s) => parseInt(s)));
// console.log(rules);
// console.log(updates);

const rulesContaining = (update: Update): Rule[] =>
  rules.filter((r) => update.includes(r[0]) && update.includes(r[1]));

const validate = (rule: Rule, update: Update): boolean =>
  update.findIndex((u) => u === rule[0]) <
  update.findIndex((u) => u === rule[1]);

const testRules = (r: Rule[], update: Update): boolean => {
  for (let i = 0; i < r.length; i++) {
    const v = validate(r[i], update);
    if (!v) return false;
  }
  return true;
};

console.time('part 1');
const correctUpdates: Update[] = [];
for (let i = 0; i < updates.length; i++) {
  const rulesApplying = rulesContaining(updates[i]);
  if (testRules(rulesApplying, updates[i])) {
    correctUpdates.push(updates[i]);
  }
}

const result1 = correctUpdates
  .map((i) => i[(i.length - 1) / 2])
  .reduce((p: number, c: number) => p + c, 0);

console.log('part1', result1);
console.timeEnd('part 1');

console.time('part 2');

const incorrectUpdates: Update[] = [];
for (let i = 0; i < updates.length; i++) {
  const rulesApplying = rulesContaining(updates[i]);
  if (!testRules(rulesApplying, updates[i])) {
    incorrectUpdates.push(updates[i]);
  }
}
// 61,29,13
// const bubble = (update: Update, r: Rule[]): Update => {
//   let swap: boolean;
//   let value: number;
//   for (let i = 0; i < update.length - 1; i++) {
//     swap = false;
//     for (let j = 0; j < update.length - i - 1; j++) {
//       console.log(i, j, update);
//       if (!testRules(r, update)) {
//         value = update[j];
//         update[j] = update[j + 1];
//         console.log('swap', value, update[j + 1]);
//         update[j + 1] = value;
//         swap = true;
//       }
//     }
//     // if (!swap) {
//     //   console.log('break');
//     //   break;
//     // }
//   }
//   return update;
// };

console.timeEnd('part 2');
console.log('part2');
