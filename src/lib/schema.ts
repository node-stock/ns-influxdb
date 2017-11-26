import { ISchemaOptions, FieldType } from 'influx';
import * as Enums from './enums';

export const Tick: ISchemaOptions = {
  measurement: Enums.Measurement.Tick,
  tags: ['symbol'],
  fields: {
    price: FieldType.FLOAT
  }
};

export const Candlestick_5min: ISchemaOptions = {
  measurement: Enums.Measurement.Candlestick_5min,
  tags: ['symbol'],
  fields: {
    open: FieldType.FLOAT,
    close: FieldType.FLOAT,
    high: FieldType.FLOAT,
    low: FieldType.FLOAT
  }
};

export const Signal: ISchemaOptions = {
  measurement: Enums.Measurement.Signal,
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
  Signal,
  Candlestick_5min
];
