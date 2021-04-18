import { EventType, Suite } from "../src";

const suite = new Suite;

suite.add('RegExp#test', () => {
  /o/.test('Hello World!');
})
.add('String#indexOf', () => {
  'Hello World!'.indexOf('o') > -1;
})
.add('String#match', () => {
  !!'Hello World!'.match(/o/);
})
.on(EventType.CYCLE, (event) => {
  // console.log(event.type, event.target.times);
})
.on(EventType.COMPLETE, (event) => {
  const suite:Suite = event.target as Suite
  console.log(suite.toString())
})
.run({async: true});