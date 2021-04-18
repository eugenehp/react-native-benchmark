import { Benchmark } from "./benchmark";
import { Suite } from "./suite";

export enum EventType {
  ABORT = 'abort',
  START = 'start',
  CYCLE = 'cycle',
  COMPLETE = 'complete',
  ALL_COMPLETE = 'all_complete',
  ERROR = 'error',
}

export class Event {
  type: EventType;
  target?: Benchmark|Suite;

  constructor(type:EventType, target?:Benchmark|Suite) {
    this.type = type;
    if(target){
      this.target = target;
    }
  }
}
