import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const PORT = process.env.NESTJS_PORT;

  await app.listen(PORT, async () => console.log('Server is listening on ' + await app.getUrl()));
}
bootstrap();