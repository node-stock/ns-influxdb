import * as assert from 'power-assert';
import { InfluxDB } from './influxdb';

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

describe('ns-influxdb', () => {
  it('测试CQ初始化', testInitCQ);
  it('测试CQ销毁', testDropCQ);
});
