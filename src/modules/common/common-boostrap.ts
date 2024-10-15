import { AllExceptionsLoggerFilter } from '../logger/filters/log-all-exceptions.filter';
import { INestApplication } from '@nestjs/common';
import { Logger } from 'winston';
import { OpenApiGeneratorService } from '../apidoc/services/openapi-generator.service';
import { SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { buildSwaggerDocument } from './utils/swagger-setup.util';
import helmet from 'helmet';

/**
 * Call to apply common app settings to boostrap.
 */

export async function commonBootstrap(args: {
  app: INestApplication;
  apiVersion: string;
  httpPort: number;
}) {
  // Set a global prefix for all API routes
  args.app.setGlobalPrefix(`api/${args.apiVersion}`);

  // Initialize the Logger middleware error filter globally
  args.app.useGlobalFilters(args.app.get(AllExceptionsLoggerFilter));

  // Test the logger
  const logger = args.app.get<Logger>(WINSTON_MODULE_PROVIDER);
  logger.info('Logger initialzed');

  // Use Helmet middleware globally to add HTTP headers for security
  args.app.use(helmet());

  // Configure Swagger
  const SWAGGER_ENDPOINT_NAME = 'swagger';
  const document = buildSwaggerDocument(args.app, args.apiVersion);
  SwaggerModule.setup(SWAGGER_ENDPOINT_NAME, args.app, document);

  // Initialize the services needing the app instance
  const openApiGeneratorService = args.app.get(OpenApiGeneratorService);
  openApiGeneratorService.initialize(args.app, args.apiVersion);

  // Start app
  await args.app.listen(args.httpPort);

  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log(`REST API running on http://localhost:${args.httpPort}`);
  console.log(
    `SwaggerUi at http://localhost:${args.httpPort}/${SWAGGER_ENDPOINT_NAME}`,
  );
}
