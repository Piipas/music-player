import { cleanEnv, num, str } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: num(),
  NODE_ENV: str({ choices: ['development', 'production'] }),
});
