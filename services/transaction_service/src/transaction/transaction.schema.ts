import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ collection: 'transactions' })
export class Transaction {
  @Prop()
  value: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
