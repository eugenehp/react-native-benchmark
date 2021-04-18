/**
 * An object of timing data including cycle, elapsed, period, start, and stop.
 *
 */
export type Times = {
  /**
   * The time taken to complete the last cycle (secs).
   *
   */
  cycle: number;

  /**
   * The time taken to complete the benchmark (secs).
   *
   */
  elapsed: number;

  /**
   * The time taken to execute the test once (secs).
   *
   */
  period: number;

  /**
   * A timestamp of when the benchmark started (ms).
   *
   */
  timeStamp: number;
}

export const defaultTimes:Times = {
  cycle: 0,
  elapsed: 0,
  period: 0,
  timeStamp: 0
}