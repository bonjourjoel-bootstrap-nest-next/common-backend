import * as bcryptjs from 'bcryptjs';

export async function hashPassword(args: {
  JWT_HASH_SECRET: string;
  plainStr: string;
}): Promise<string> {
  const passwordHashed = await bcryptjs.hash(args.plainStr, 10);
  return passwordHashed;
}

export async function compareHashedPasword(args: {
  JWT_HASH_SECRET: string;
  plainStr: string;
  hashedStr: string;
}): Promise<boolean> {
  const isMatch = await bcryptjs.compare(args.plainStr, args.hashedStr);
  return isMatch;
}
