import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  @Get()
  @GrpcMethod('')
  healthCheck() {
    return 'ok';
  }
}
