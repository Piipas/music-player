import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';

export const jwtExtractor = (jwtToken: string, secret: string, withBearer: boolean = true) => {
  try {
    if (!jwtToken.startsWith('Bearer') && withBearer) return null;
    const token = jwtToken.split(' ')[Number(withBearer)];
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
