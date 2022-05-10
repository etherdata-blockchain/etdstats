import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type TransactionDocument = Transaction & Document;

export class Transaction {
  @Prop()
  value: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
