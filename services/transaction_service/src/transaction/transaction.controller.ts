import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async count() {
    const count = await this.transactionService.count();
    return {
      count: count,
    };
  }
}
