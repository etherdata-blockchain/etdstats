import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { urls } from 'common';
import { join } from 'path';

async function bootstrap() {
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: urls.grpc.TRANSACTION_SERVICE_URL,
        package: 'transaction',
        protoPath: join(__dirname, 'grpc/transaction.proto'),
      },
    });

  const app = await NestFactory.create(AppModule);

  await microservice.listen();
  await app.listen(urls.grpc.TRANSACTION_PORT);
}

bootstrap().then(() => console.log('Transaction service is up'));
