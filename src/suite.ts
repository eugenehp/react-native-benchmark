import { EventType, Event } from './event';
import { Benchmark } from "./benchmark";
import { ListenerFunction } from './types';
import { Options, defaultOptions } from './types/options';
import { Stats } from './types/stats';

export class Suite {
  private benches:Array<Benchmark> = [];

  add(name:string, fn:Function): Suite {
    this.benches.push(new Benchmark(name, fn))
    return this;
  }

  on(type: EventType, listener: ListenerFunction): Suite {
    let counter = 0;
    const suite = this;
    
    switch(type){
      case EventType.COMPLETE:
        // check when bench is complete
        this.benches.map( bench => bench.addListener(type, () => {
          if(++counter === this.benches.length)
            listener(new Event(type, suite)) // notify when all benches and suite are complete
        }));
        break;
      default:
        this.benches.map( bench => bench.addListener(type, listener));
    }

    return this
  }

  off(type: EventType, listener?: ListenerFunction): Suite {
    this.benches.map( bench => {
      if(listener){
        bench.removeListener(type, listener)
      }else{
        bench.removeAllListeners(type)
      }
    });
    return this
  }

  run = async (options:Options = {}) => {
    const opts:Options = {
      ...defaultOptions,
      ...options
    }
    
    if(opts.async){
      const suite = this;
      
      const array = []

      const runBenchmark = function (b:Benchmark, opts:Options) {
        return setTimeout(function() {
          b.run(opts)
        })
      }
      
      suite.benches.map( bench => {
        array.push(runBenchmark(bench, opts))
      })

      return await Promise.all(array)
    }else{
      return this.benches.map( bench => bench.run(opts))
    }
  }

  toJSON():{[key:string]:Stats} {
    let result:{[key:string]:Stats} = {};

    this.benches.map( b => result[b.name] = b.stats.toJSON())

    return result;
  }

  toString():string { 
    return this.benches.map(b => b.toString()).join('\n')
  }
}