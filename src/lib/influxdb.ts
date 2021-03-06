import { InfluxDB as Influx } from 'influx';
import * as assert from 'power-assert';

import * as Schema from './schema';
import * as Param from './param';
import * as Enums from './enums';
import * as CQ from './cq';

export interface IConfig {
  host: string,
  database: string,
  username?: string,
  password?: string
}

export { Schema, Param, Enums };

/**
  * @class
  * @classdesc influxdb管理模块
  */
export class InfluxDB {

  options: IConfig;
  connection: Influx;

  constructor(options: IConfig) {
    this.options = options;
    this.connection = new Influx(
      Object.assign({}, options, { schema: Schema.All })
    );
  }

  async initDB() {
    const dbList: string[] = await this.connection.getDatabaseNames();
    if (!dbList.includes(this.options.database)) {
      this.connection.createDatabase(this.options.database);
    }
  }

  async initCQ() {
    const cqList = await this.connection.showContinousQueries();
    if (!cqList.find(o => o.name === Enums.Measurement.Candlestick_5min)) {
      await this.connection.query(CQ.candlestick_5min(this.options.database));
    }
  }

  async dropCQ() {
    const cqList = await this.connection.showContinousQueries();
    if (cqList.find(o => o.name === Enums.Measurement.Candlestick_5min)) {
      await this.connection.dropContinuousQuery(Enums.Measurement.Candlestick_5min);
    }
  }

  putTick(param: Param.Tick) {
    return this.connection.writeMeasurement(Enums.Measurement.Tick, [{
      tags: {
        symbol: param.symbol
      },
      fields: {
        price: param.price,
        volume: param.volume
      }
    }])
  }

  putCandlestick(param: Param.Candlestick, unit: Enums.CandlestickUnit) {
    assert(unit === Enums.CandlestickUnit.Min5, '当前只支持5分钟线');
    return this.connection.writeMeasurement('candlestick_' + unit, [{
      tags: {
        symbol: param.symbol
      },
      fields: {
        open: param.open,
        close: param.close,
        high: param.high,
        low: param.low
      }
    }])
  }

  putSignal(param: Param.Signal) {
    return this.connection.writeMeasurement(Enums.Measurement.Signal, [{
      tags: {
        symbol: param.symbol
      },
      fields: {
        side: param.side,
        price: param.price,
        mocktime: param.mocktime,
        notes: param.notes
      }
    }])
  }
}
