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
.on(EventType.ALL_COMPLETE, () => {
  console.log(suite.toString())
  console.log('===================')
  console.log(suite.toJSON())
})
.run({async: true});