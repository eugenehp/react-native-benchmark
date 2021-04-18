/**
 * T-Distribution two-tailed critical values for 95% confidence.
 * 
 * For more info see http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm.
 */
const tTable = {
  '1':  12.706, '2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
  '7':  2.365,  '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
  '13': 2.16,   '14': 2.145, '15': 2.131, '16': 2.12,  '17': 2.11,  '18': 2.101,
  '19': 2.093,  '20': 2.086, '21': 2.08,  '22': 2.074, '23': 2.069, '24': 2.064,
  '25': 2.06,   '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
  'infinity': 1.96
};

/**
 * An object of stats including mean, margin or error, and standard deviation.
 * @link inspired by https://github.com/bestiejs/benchmark.js/blob/42f3b732bac3640eddb3ae5f50e445f3141016fd/benchmark.js#L1911-L1927
 */
export class Stats {
  constructor() {
    this.sample = [];
  }
  /**
   * The margin of error.
   *
   */
  public get moe(): number {
    // Compute the degrees of freedom.
    const df = this.sample.length - 1;
    // Compute the critical value.
    const critical = tTable[Math.round(df) || 1] || tTable.infinity;
    // Compute the margin of error.
    return this.sem * critical;
  };

  /**
  * The relative margin of error (expressed as a percentage of the mean).
  *
  */
  public get rme(): number {
    // Compute the relative margin of error.
    return (this.moe / this.mean) * 100 || 0;
  };

  /**
  * The standard error of the mean.
  *
  */
  public get sem(): number {
    // Compute the standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
    return this.deviation / Math.sqrt(this.sample.length)
  };

  /**
  * The sample standard deviation.
  *
  */
  public get deviation(): number {
    // Compute the sample standard deviation (estimate of the population standard deviation).
    return Math.sqrt(this.variance)
  };

  /**
  * The sample arithmetic mean (secs).
  *
  */
  public get mean(): number {
    // Compute the sample mean (estimate of the population mean).
    return this.sample.reduce( (sum, x) => sum + x ) / this.sample.length || 0
  };

  /**
  * The array of sampled periods.
  *
  */
  sample: number[];

  /**
  * The sample variance.
  *
  */
  public get variance(): number {
    // Compute the sample variance (estimate of the population variance).
    return this.sample.reduce( (sum, x) => sum + Math.pow(x - this.mean, 2), 0 ) / this.sample.length || 0
  };

  public toString():string {
    const {
      moe,
      mean,
      rme,
      deviation,
      variance,
      sem,
      sample
    } = this;

    const obj = {
      moe,
      mean,
      rme,
      deviation,
      variance,
      sem,
      sample
    }

    return `Stats: ${JSON.stringify(obj, null, 2)}`
  }

  public toJSON():Stats {
    const {
      moe,
      mean,
      rme,
      deviation,
      variance,
      sem,
      sample
    } = this;

    return {
      moe,
      mean,
      rme,
      deviation,
      variance,
      sem,
      sample
    } as Stats
  }
}