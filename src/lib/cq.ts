import * as Enums from './enums';

export const candlestick_5min = () => `
  SELECT
    max(price) as high,
    min(price) as low,
    first(price) as open,
    last(price) as close
  INTO ${Enums.Measurement.Candlestick_5min}
  FROM ${Enums.Measurement.Tick}
  GROUP BY time(5m), symbol
`.replace(/\n/g, '');
