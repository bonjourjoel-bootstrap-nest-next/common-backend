import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { SanitizeMiddleware } from './middlewares/sanitize.middleware';

@Module({})
export class SanitizeMiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SanitizeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
