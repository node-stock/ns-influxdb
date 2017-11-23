import * as assert from 'power-assert';
import { InfluxDB, Schema, Enums } from './influxdb';
import * as NsTypes from 'ns-types';

const config = {
  host: '127.0.0.1',
  database: 'test'
}
const influxdb = new InfluxDB(config);

const testInitCQ = async () => {
  await influxdb.initDB();
  await influxdb.initCQ();
  const cqList = await influxdb.connection.showContinousQueries();
  assert(cqList.length === 1);
}

const testDropCQ = async () => {
  await influxdb.dropCQ();
  const cqList = await influxdb.connection.showContinousQueries();
  assert(cqList.length === 0);
}

const testPutTick = async () => {
  const measurement = Schema.Tick.measurement;
  await influxdb.connection.dropMeasurement(measurement);
  await influxdb.putTick({
    symbol: '6553',
    price: 2200
  });
  const res = await influxdb.connection.query('select * from ' + measurement);
  assert(res.length === 1);
}

const testPutCandlestick = async () => {
  const measurement = Schema.Candlestick_5min.measurement;
  await influxdb.connection.dropMeasurement(measurement);
  await influxdb.putCandlestick({
    symbol: '6553',
    open: 2100,
    close: 2200,
    low: 2010,
    high: 2250
  }, Enums.CandlestickUnit.Min5);
  const res = await influxdb.connection.query('select * from ' + measurement);
  assert(res.length === 1);
}

const testPutSignal = async () => {
  const measurement = Schema.Signal.measurement;
  //await influxdb.connection.dropMeasurement(measurement);
  await influxdb.putSignal({
    symbol: '6553',
    side: NsTypes.OrderSide.Sell,
    price: 2500,
    mocktime: '',
    notes: '测试买入'
  });
  const res = await influxdb.connection.query('select * from ' + measurement);
  //assert(res.length === 1);
}

describe('ns-influxdb', () => {
  it('测试CQ初始化', testInitCQ);
  it('测试CQ销毁', testDropCQ);
  it('测试放入tick数据', testPutTick);
  it('测试放入candlestick数据', testPutCandlestick);
  it('测试放入signal数据', testPutSignal);
});
