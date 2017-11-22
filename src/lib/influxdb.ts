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

export { Schema };

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

  async initCQ() {
    const cqList = await this.connection.showContinousQueries();
    if (!cqList.find(o => o.name === Enums.CandlestickCQ.Min5)) {
      await this.connection.createContinuousQuery(
        Enums.CandlestickCQ.Min5,
        CQ.candlestick_5min(),
        this.options.database
      );
    }
  }

  async dropCQ() {
    const cqList = await this.connection.showContinousQueries();
    if (cqList.find(o => o.name === Enums.CandlestickCQ.Min5)) {
      await this.connection.dropContinuousQuery(Enums.CandlestickCQ.Min5);
    }
  }

  putTick(param: Param.Tick) {
    return this.connection.writeMeasurement('tick', [{
      tags: {
        symbol: param.symbol
      },
      fields: {
        price: param.price
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
}
