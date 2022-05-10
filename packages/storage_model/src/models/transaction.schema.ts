import { buildSchema, getModelForClass, prop } from '@typegoose/typegoose';
import { interfaces } from 'common';

export class Transaction implements interfaces.database.TransactionInterface {
  @prop()
  public blockNumber!: number;
  @prop()
  public transactionIndex!: number;
  @prop()
  public from!: string;
  @prop()
  public to!: string;
  @prop()
  public value!: string;
  @prop()
  public gasPrice!: string;
  @prop()
  public gas!: number;
  @prop()
  public input!: string;
  @prop()
  public maxPriorityFeePerGas?: string | undefined;
  @prop()
  public maxFeePerGas?: string | undefined;
  @prop()
  public hash!: string;
  @prop()
  public nonce!: string;
  @prop()
  public blockHash!: string;
}

export const TransactionModel = getModelForClass(Transaction);
export const TransactionSchema = buildSchema(Transaction);
