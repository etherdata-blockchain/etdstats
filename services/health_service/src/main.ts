import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { urls } from 'common';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       url: urls.grpc.HEALTH_SERVICE_URL,
  //       package: 'health',
  //       protoPath: join(__dirname, 'grpc/health.proto'),
  //     },
  //   },
  // );
  // await app.listen();
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap().then((r) => console.log('health service is up'));
