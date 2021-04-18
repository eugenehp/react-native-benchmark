# react-native-benchmark

[![GitHub license](https://img.shields.io/github/license/eugenehp/react-native-benchmark.svg?color=blue&style=for-the-badge)](./LICENSE)
[![npm](https://img.shields.io/npm/v/react-native-benchmark.svg?color=green&style=for-the-badge)](https://www.npmjs.com/package/react-native-benchmark)
[![npm downloads](https://img.shields.io/npm/dw/react-native-benchmark.svg?label=npm%20downloads&style=for-the-badge)](https://npmcharts.com/compare/react-native-benchmark?minimal=true)
[![total npm downloads](https://img.shields.io/npm/dt/react-native-benchmark.svg?label=total%20npm%20downloads&style=for-the-badge)](https://npmcharts.com/compare/react-native-benchmark?minimal=true)
[![GitHub watchers](https://img.shields.io/github/watchers/eugenehp/react-native-benchmark.svg?style=for-the-badge)](https://github.com/eugenehp/react-native-benchmark/watchers)
[![GitHub stars](https://img.shields.io/github/stars/eugenehp/react-native-benchmark.svg?label=GitHub%20stars&style=for-the-badge)](https://github.com/eugenehp/react-native-benchmark/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/eugenehp/react-native-benchmark.svg?style=for-the-badge)](https://github.com/eugenehp/react-native-benchmark/network/members)
[![open bugs](https://img.shields.io/github/issues-raw/eugenehp/react-native-benchmark/bug.svg?color=d73a4a&label=open%20bugs&style=for-the-badge)](https://github.com/eugenehp/react-native-benchmark/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug)
[![total open issues](https://img.shields.io/github/issues-raw/eugenehp/react-native-benchmark.svg?label=total%20open%20issues&style=for-the-badge)](https://github.com/eugenehp/react-native-benchmark/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/eugenehp/react-native-benchmark.svg?style=for-the-badge)](https://github.com/eugenehp/react-native-benchmark/pulls)

[![Packagephobia](https://badgen.net/packagephobia/install/react-native-benchmark)](https://packagephobia.com/result?p=react-native-benchmark)
[![Bundlephobia](https://badgen.net/bundlephobia/min/react-native-benchmark)](https://bundlephobia.com/result?p=react-native-benchmark@2.0.0)

React Native  benchmarking library inspired by [benchmark.js](https://github.com/bestiejs/benchmark.js) and written in TypeScript.

<img width="568" alt="Screen Shot 2021-04-17 at 19 16 06" src="https://user-images.githubusercontent.com/1857263/115132008-6657f400-9fb1-11eb-934e-66635056e430.png">

<span style="color:red">**Warning**: This library is work in progess. Use it at your own risk!</span>

## Installation

```shell
npm i -s benchmark-ts
```

## Usage

```Typescript
// example/index.ts
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
  // const s:Suite = event.target as Suite
  console.log(suite.toString())
})
.run({async: true});
```

## Example output

Output for `suite.toString()` method.

```plain
RegExp#test - 2211577 ops/sec ± 2.10%
String#indexOf - 2335987 ops/sec ± 1.96%
String#match - 2046868 ops/sec ± 0.88%
```

Output for `suite.toJSON()` method.

```JSON
{
  'RegExp#test': {
    moe: 46334.779732633404,
    mean: 2211577.4,
    rme: 2.0951009778194245,
    deviation: 37322.66469908063,
    variance: 1392981300.2399998,
    sem: 16691.203073715205,
    sample: [ 2138299, 2234914, 2228720, 2217517, 2238437 ]
  },
  'String#indexOf': {
    moe: 45836.23559201627,
    mean: 2335986.6,
    rme: 1.962178875170614,
    deviation: 36921.08739785436,
    variance: 1363166694.6399999,
    sem: 16511.612244962635,
    sample: [ 2265366, 2353147, 2372154, 2338449, 2350817 ]
  },
  'String#match': {
    moe: 18031.048282470998,
    mean: 2046867.8,
    rme: 0.880909274280977,
    deviation: 14524.009245384002,
    variance: 210946844.56,
    sem: 6495.33439570281,
    sample: [ 2048837, 2035629, 2025664, 2064410, 2059799 ]
  }
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Sponsorship

Thank you to our sponsors:

[<img width="300px" src="https://user-images.githubusercontent.com/1857263/114124204-c4e1eb80-98a8-11eb-80ab-64683c24bbc5.png" alt="Reactive Lions™" target="_blank">](https://www.reactivelions.com)

## License

[MIT](./LICENSE)

Copyright (c) 2021 Eugene Hauptmann
