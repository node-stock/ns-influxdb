export interface Tick {
  symbol: string;
  price: number;
}

export interface Candlestick {
  symbol: string;
  open: number;
  close: number;
  high: number;
  low: number;
}
