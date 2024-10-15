import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';

export function buildSwaggerDocument(
  app: INestApplication,
  apiVersion: string,
) {
  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setVersion(apiVersion)
    // add sections
    .addTag('apidoc')
    // add a bearer token button login/logout, the jwt token will be automatically added to each request
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Log in , then enter your JWT Bearer token (accessToken)',
    })
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  return document;
}
