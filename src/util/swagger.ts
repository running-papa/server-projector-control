import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
//Keep the token value when refreshed
const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: false,
    validatorUrl: 'http://localhost:3000/terms/location',
  },
};

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Projector control API Docs')
    .setDescription('Projector control DOCS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  //Application of security when using api documents
  if (process.env.NODE_ENV == 'production') {
    app.use(
      ['/api-docs', '/api-docs-json'],
      basicAuth({
        challenge: true,
        users: {
          ['admin']: 'admin',
        },
      }),
    );
  }
  const document = SwaggerModule.createDocument(app, options);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}
