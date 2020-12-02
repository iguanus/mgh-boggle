import { groupList, groupCount, recursiveKeyValue } from "./aggregators";
const sample = [
    { myKey: "a", id: 1 },
    { myKey: "a", id: 2 },
    { myKey: "b", id: 3 }
]

test("groupList produces object with arrays by key", () => {
  expect(groupList(sample, "myKey")).toEqual(
    {
      a: [sample[0], sample[1]],
      b: [sample[2]]
    })
});

test("groupCount produces sum of values by key", () => {
  expect(groupCount(sample, "myKey")).toEqual(
    {
      a: 2,
      b: 1
    })
 });