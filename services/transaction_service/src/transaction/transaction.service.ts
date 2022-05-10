import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { models } from 'storage-model';
import { Model } from 'mongoose';
import { interfaces } from 'common';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<interfaces.database.TransactionInterface>,
  ) {}

  count() {
    return this.transactionModel.countDocuments({});
  }
}
