import { cleanEnv, num, str } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: num(),
  NODE_ENV: str({ choices: ['development', 'production'] }),

  JWT_ACCESS_TOKEN_SECRET: str(),
  JWT_REFRESH_TOKEN_SECRET: str(),
  JWT_ACCESS_TOKEN_EXPIRY_DURATION: str(),
  JWT_REFRESH_TOKEN_EXPIRY_DURATION: str(),
});
