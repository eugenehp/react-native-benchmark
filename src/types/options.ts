/**
 * The default options copied by benchmark instances.
 *
 */
export type Options = {
  /**
   * A flag to indicate that benchmark cycles will execute asynchronously
   * by default.
   *
   */
  async?: boolean;

  /**
   * A flag to indicate that the benchmark clock is deferred.
   *
   */
  defer?: boolean;

  /**
   * The delay between test cycles (secs).
   */
  delay?: number; // 0.005

  /**
   * Displayed by `Benchmark#toString` when a `name` is not available
   * (auto-generated if absent).
   *
   */
  id?: string;

  /**
   * The default number of times to execute a test on a benchmark's first cycle.
   *
   */
  initCount?: number; // 1

  /**
   * The maximum time a benchmark is allowed to run before finishing (secs).
   *
   * Note: Cycle delays aren't counted toward the maximum time.
   *
   */
  maxTime?: number; // 5

  /**
   * The minimum sample size required to perform statistical analysis.
   *
   */
  minSamples?: number; // 5

  /**
   * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
   *
   */
  minTime?: number; // 0

  /**
   * The name of the benchmark.
   *
   */
  name?: string;

  /**
   * An event listener called when the benchmark is aborted.
   *
   */
  onAbort?: Function;

  /**
   * An event listener called when the benchmark completes running.
   *
   */
  onComplete?: Function;

  /**
   * An event listener called after each run cycle.
   *
   */
  onCycle?: Function;

  /**
   * An event listener called when a test errors.
   *
   */
  onError?: Function;

  /**
   * An event listener called when the benchmark is reset.
   *
   */
  onReset?: Function;

  /**
   * An event listener called when the benchmark starts running.
   *
   */
  onStart?: Function;
};


export const defaultOptions: Options = {
  async: false,
  defer: false,
  delay: 0.005,
  initCount: 1,
  maxTime: 5,
  minSamples: 5,
  minTime: 0
}