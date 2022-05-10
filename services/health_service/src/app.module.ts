import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HealthService } from './health/health.service';
import { urls } from 'common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: urls.grpc.TRANSACTION_SERVICE_URL,
          package: 'transaction',
          protoPath: join(__dirname, 'grpc/transaction.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],
})
export class AppModule {}
