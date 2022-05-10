import { interfaces } from 'common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { TransactionModel } from '../models';

describe('Given a transaction model', () => {
  let server: MongoMemoryServer;
  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    const uri = server.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.stop();
  });

  test('Should create data', async () => {
    const data: interfaces.database.TransactionInterface = {
      hash: '0x12345',
      nonce: '0x12345',
      blockHash: '0x12345',
      blockNumber: 0,
      transactionIndex: 0,
      from: '0x12345',
      to: '0x12345',
      value: '0x12345',
      gasPrice: '0x12345',
      gas: 0,
      input: '0x12345',
    };
    const document = await TransactionModel.create(data);
    expect(document).toBeDefined();
    expect(await TransactionModel.count()).toBe(1);
  });
});
