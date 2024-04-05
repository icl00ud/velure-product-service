import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { addSwagger } from './config/swagger.config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.NESTJS_PORT;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  addSwagger(app);

  await app.listen(PORT, async () => console.log('Server is listening on port', PORT));
}
bootstrap();  