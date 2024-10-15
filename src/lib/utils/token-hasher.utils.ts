import { createHmac } from 'crypto';

export async function hashToken(args: {
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

export async function compareHashedToken(args: {
  JWT_HASH_SECRET: string;
  plainStr: string;
  hashedStr: string;
}): Promise<boolean> {
  const plainStrHashed = await hashToken(args);

  return plainStrHashed === args.hashedStr;
}
