import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { addSwagger } from './config/swagger.config';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.NESTJS_PORT || 3000;
  const ORIGIN_UI = process.env.ORIGIN_UI || 'http://localhost:4200';

  const app = await NestFactory.create(AppModule);
  app.enableCors( { origin: ORIGIN_UI } );
  addSwagger(app);

  await app.listen(PORT, () => console.log('Server is listening on port', PORT));
}
bootstrap();  