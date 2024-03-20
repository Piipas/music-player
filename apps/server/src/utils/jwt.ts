import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';

export const jwtExtractor = (jwtToken: string, secret: string) => {
  try {
    if (!jwtToken.startsWith('Bearer')) return null;
    const token = jwtToken.split(' ')[1];
    return verify(token, secret) as JwtPayload;
  } catch (error) {
    return false;
  }
};

// export const isJwtValid = (payload: JwtPayload) => {
//   console.log(Date.now() < payload.exp * 1000);
//   if (!payload.exp || Date.now() < payload.exp * 1000) return false;
//   return true;
// };
