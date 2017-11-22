export const candlestick_5min = () => `
  SELECT
    max(price) as high,
    min(price) as low,
    first(price) as open,
    last(price) as close
  INTO candlstick_5min
  FROM tick
  GROUP BY time(5m), symbol
`.replace(/\n/g, '');