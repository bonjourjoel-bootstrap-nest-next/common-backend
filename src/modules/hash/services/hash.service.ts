import * as bcryptjs from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

@Injectable()
export class HashService {
  async hashPassword(args: {
    JWT_HASH_SECRET: string;
    plainStr: string;
  }): Promise<string> {
    const passwordHashed = await bcryptjs.hash(args.plainStr, 10);
    return passwordHashed;
  }

  async compareHashedPasword(args: {
    JWT_HASH_SECRET: string;
    plainStr: string;
    hashedStr: string;
  }): Promise<boolean> {
    const isMatch = await bcryptjs.compare(args.plainStr, args.hashedStr);
    return isMatch;
  }

  async hashToken(args: {
    JWT_HASH_SECRET: string;
    plainStr: string;
  }): Promise<string> {
    if (!args.JWT_HASH_SECRET) {
      throw new Error('JWT_HASH_SECRET secret is not defined');
    }

    const hash = createHmac('sha256', args.JWT_HASH_SECRET)
      .update(args.plainStr)
      .digest('hex');

    return hash;
  }

  async compareHashedToken(args: {
    JWT_HASH_SECRET: string;
    plainStr: string;
    hashedStr: string;
  }): Promise<boolean> {
    const plainStrHashed = await this.hashToken(args);

    return plainStrHashed === args.hashedStr;
  }
}
