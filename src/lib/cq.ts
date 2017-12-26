import * as Enums from './enums';

export const candlestick_5min = (db: string) => `
  CREATE CONTINUOUS QUERY ${Enums.Measurement.Candlestick_5min} ON "${db}"
    BEGIN
      SELECT
        max(price) AS high,
        min(price) AS low,
        first(price) AS open,
        last(price) AS close,
        sum(volume) AS volume
      INTO ${Enums.Measurement.Candlestick_5min}
      FROM ${Enums.Measurement.Tick}
      GROUP BY time(5m), symbol
    END
`;
// RESAMPLE EVERY 30s
