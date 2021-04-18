import { EventEmitter } from 'events';
import { EventType, Event } from './event';
import { Options, defaultOptions } from './types/options';
import { Stats } from './types/stats';
import { Times, defaultTimes } from './types/times';
import { now } from './utils';

const SECOND = 1000; // ms

export class Benchmark extends EventEmitter {
  id: string = '';
  name: string = '';
  fn: Function;
  count: number = 0;
  cycles: number = 0;
  running: boolean = false;
  options: Options;

  stats: Stats = new Stats()
  times: Times = defaultTimes;
  
  constructor(name: string, fn: Function, options?: Options) {
    super()
    this.id = `${name}-${new Date().getTime()}`
    this.name = name;
    this.fn = fn;

    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  clone = ():Benchmark => {
    const copy = new (this.constructor as { new (): Benchmark })();
    Object.assign(copy, this);
    return copy;
  }

  initRun = () => {
    this.times.timeStamp = now();
    this.emit(EventType.START, new Event(EventType.START, this));
    this.running = true;

    const start = now();
    this.fn();
    const end = now();
    const period = (end - start) / SECOND;

    this.times.cycle = period;
    this.times.period = period;

    this.count = 1;
    this.emit(EventType.CYCLE, new Event(EventType.CYCLE, this))
  }

  cycle = ():Promise<number> => new Promise( (resolve, _reject) => {
    let flag = true;
    const bench = this;

    while(flag){
      const start = now()
      bench.fn();
      const end = now()

      bench.count++;
      bench.times.cycle = (end - start) / SECOND;
      bench.emit(EventType.CYCLE, new Event(EventType.CYCLE, this))

      if(now() - bench.times.timeStamp > SECOND){
        flag = false;
        
        const elapsed = (now() - bench.times.timeStamp) / SECOND;
        bench.times.elapsed = elapsed
        
        return resolve(bench.ops());
      }
    }
  })

  reset = () => {
    this.times.timeStamp = now();
    this.times = defaultTimes;
    this.count = 0;
  }

  run = async (options:Options) => {
    this.initRun()
    let samplesCounter = options.minSamples
    while(samplesCounter--){
      const ops = await this.cycle()
      this.stats.sample.push(ops)
      this.reset()
    }

    this.complete()
  }

  complete = () => {
    this.running = false;
    this.emit(EventType.COMPLETE, new Event(EventType.COMPLETE, this))
  }

  ops = ():number => Math.floor(this.count / this.times.elapsed);

  toString = () => `${this.name} - ${this.stats.mean.toFixed(0)} ops/sec \xb1 ${this.stats.rme.toFixed(2)}%`;
}