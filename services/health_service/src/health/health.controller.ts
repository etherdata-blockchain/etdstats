import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { interfaces } from 'common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController implements interfaces.services.HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @GrpcMethod('HealthService', 'healthCheck')
  async healthCheck() {
    const result = await this.healthService.checkTransactionHealth();
    console.log(result);
    return { reason: 'ok' };
  }
}
