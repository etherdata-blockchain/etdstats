import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { interfaces } from 'common';

@Controller('health')
export class HealthController
  implements interfaces.services.TransactionController
{
  @GrpcMethod()
  async healthCheck() {
    return { reason: 'ok' };
  }
}
