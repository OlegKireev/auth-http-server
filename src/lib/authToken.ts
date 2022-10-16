import { sign } from 'jsonwebtoken';
import { Role } from '../types/roles';

export type TokenData = {
  id: string,
  roles: Role[]
};

type GenerateAuthToken = (
  id: string,
  roles: Role[]
) => string

export const generateAuthToken: GenerateAuthToken = (
  id,
  roles
) => {
  const secretKey = process.env.SECRET_KEY;
  const payload: TokenData = { id, roles };
  
  return sign(payload, secretKey, {
    expiresIn: '30d'
  });
};
