import { createHash, randomBytes, timingSafeEqual } from 'crypto';

export const generateRecipeCreatorToken = (): string => {
  return randomBytes(32).toString('base64url');
};

export const hashRecipeCreatorToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex');
};

export const isRecipeCreatorTokenValid = (
  token: string | undefined,
  tokenHash: string | null,
): boolean => {
  if (!token || !tokenHash) {
    return false;
  }

  const currentHash = Buffer.from(hashRecipeCreatorToken(token), 'hex');
  const expectedHash = Buffer.from(tokenHash, 'hex');

  if (currentHash.length !== expectedHash.length) {
    return false;
  }

  return timingSafeEqual(currentHash, expectedHash);
};

export const isAdminTokenValid = (token: string | undefined): boolean => {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!token || !adminToken) {
    return false;
  }

  const currentToken = Buffer.from(token);
  const expectedToken = Buffer.from(adminToken);

  if (currentToken.length !== expectedToken.length) {
    return false;
  }

  return timingSafeEqual(currentToken, expectedToken);
};
