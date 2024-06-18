import { sign } from 'jsonwebtoken';

interface CreteTokenParams {
  email: string;
  name: string;
  sub: string;
}

export function createToken(parameters: CreteTokenParams) {
  return sign(parameters, process.env.APP_SECRET || '', {
    expiresIn: '1d',
  });
}
