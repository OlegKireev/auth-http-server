import { sign } from 'jsonwebtoken';

type GenerateAuthToken = (
  id: string,
  roles: {
    type?: string | undefined;
    ref?: unknown;
  }[]
) => string

export const generateAuthToken: GenerateAuthToken = (
  id,
  roles
) => {
  const secretKey = process.env.SECRET_KEY || 'DEFAULT_SECRET_KEY';
  const payload = { id, roles };
  return sign(payload, secretKey, {
    expiresIn: '1m'
  });
};