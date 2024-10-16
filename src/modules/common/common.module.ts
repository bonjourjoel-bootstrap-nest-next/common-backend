import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { APP_GUARD } from '@nestjs/core';
import { AllExceptionsLoggerFilter } from '../logger/filters/log-all-exceptions.filter';
import { ApidocController } from '../apidoc/controllers/apidoc.controller';
import { ApidocModule } from '../apidoc/apidoc.module';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from '../health/controllers/health.controller';
import { HealthModule } from '../health/health.module';
import { LoggerModule } from '../logger/logger.module';
import { MultipartJsonMiddleware } from '../multipart-json-middleware/middlewares/multipart-json.middleware';
import { RequestLoggerMiddleware } from '../logger/middlewares/request-logger.middleware';
import { SanitizeMiddleware } from '../sanitize-middleware/middlewares/sanitize.middleware';

/**
 * Common application module.
 */

@Module({
  imports: [
    // source environment variables
    ConfigModule.forRoot({
      envFilePath: `.env.common.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    // app modules
    LoggerModule,
    ApidocModule,
    HealthModule,
    // default throttle rule
    ThrottlerModule.forRoot([
      {
        ttl: 10 * 1000, // throttle interval in ms
        limit: 10, // max requests per interval per ip address
      },
    ]),
  ],
  controllers: [ApidocController, HealthController],
  providers: [
    // install throttle globally
    {
      provide: APP_GUARD, // Provide ThrottlerGuard as a global guard
      useClass: ThrottlerGuard,
    },
    AllExceptionsLoggerFilter,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        MultipartJsonMiddleware,
        SanitizeMiddleware,
        RequestLoggerMiddleware,
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
