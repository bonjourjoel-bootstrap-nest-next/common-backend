import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { MultipartJsonMiddleware } from './middlewares/multipart-json.middleware';

@Module({})
export class MultipartJsonMiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MultipartJsonMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
