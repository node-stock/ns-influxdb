import { ISchemaOptions, FieldType } from 'influx';

export const Tick: ISchemaOptions = {
  measurement: 'tick',
  tags: ['symbol'],
  fields: {
    price: FieldType.FLOAT
  }
};

export const Candlestick_5min: ISchemaOptions = {
  measurement: 'candlestick_5min',
  tags: ['symbol'],
  fields: {
    open: FieldType.FLOAT,
    close: FieldType.FLOAT,
    high: FieldType.FLOAT,
    low: FieldType.FLOAT
  }
};

export const Signal: ISchemaOptions = {
  measurement: 'signal',
  tags: ['symbol'],
  fields: {
    side: FieldType.STRING,
    price: FieldType.FLOAT,
    mocktime: FieldType.STRING,
    notes: FieldType.STRING
  }
};

export const All = [
  Tick,
  Candlestick_5min
];
