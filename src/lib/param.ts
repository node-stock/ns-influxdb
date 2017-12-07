import * as NsTypes from 'ns-types';

export interface Tick {
  symbol: string;
  price?: number;
  volume?: number;
}

export interface Candlestick {
  symbol: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface Signal {
  symbol: string;
  side: NsTypes.OrderSide;
  price: number;
  mocktime: string;
  notes: string;
}
