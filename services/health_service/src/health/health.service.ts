import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { interfaces } from 'common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class HealthService implements OnModuleInit {
  private transactionService: any;

  constructor(@Inject('TRANSACTION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit(): any {
    this.transactionService = this.client.getService('TransactionController');
  }

  async checkTransactionHealth() {
    return (
      this.transactionService.healthCheck({}) as any as Observable<any>
    ).toPromise();
  }
}
