import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { addSwagger } from './config/swagger.config';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.NESTJS_PORT;

  addSwagger(app);

  await app.listen(PORT, async () => console.log('Server is listening on port', PORT));
}
bootstrap();