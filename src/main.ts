import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.APP_PORT || 3010;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: +PORT,
      },
    }
  );

  await app.listen();
  logger.log(`Product service is running on port ${PORT}`);
}
bootstrap();
