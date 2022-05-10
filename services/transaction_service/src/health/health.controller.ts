import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { interfaces } from 'common';

@Controller('health')
export class HealthController
  implements interfaces.services.TransactionController
{
  @GrpcMethod('TransactionController', 'healthCheck')
  async healthCheck() {
    console.log('Checking transaction health');
    return { reason: 'ok' };
  }
}
