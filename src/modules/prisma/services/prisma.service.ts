import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  /**
   * Converts the prisma error into an appropriate Nest.js HTTP error.
   *
   * How to use:
   *    try {
   *      await this.prismaService.doSomething();
   *    } catch (error) {
   *      throw this.prismeService.toHttpError(error);
   *    }
   */

  toHttpError(prismaError: any): any {
    // format the error message to return the prisma error in the http error
    const fullErrMsg: string = prismaError.message || 'Unknown prisma error';
    const lines: string[] = fullErrMsg.split('\n');
    const errMsg = lines[lines.length - 1];
    // handle the errors with the appropriate http error
    enum PRISMA_ERROR_CODE {
      RECORD_NOT_FOUND = 'P2025',
    }
    switch (prismaError.code) {
      case PRISMA_ERROR_CODE.RECORD_NOT_FOUND: {
        return new NotFoundException(errMsg);
      }
      default: {
        // format the unknown errors properly to return the prisma error in the http error 500
        return new InternalServerErrorException(errMsg);
      }
    }
  }
}
