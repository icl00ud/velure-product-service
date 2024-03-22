import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const addSwagger = (app: INestApplication) => {
  const serviceName = process.env.SERVICE_NAME;
  const serviceDescription = process.env.SERVICE_DESCRIPTION;
  const serviceVersion = process.env.SERVICE_VERSION;

  const config = new DocumentBuilder()
    .setTitle(serviceName)
    .setDescription(serviceDescription)
    .setVersion(serviceVersion)

  const configBuilded = config.build();

  const document = SwaggerModule.createDocument(app, configBuilded);

  SwaggerModule.setup('docs', app, document);
};