import { JwtPayload, verify } from 'jsonwebtoken';

const jwtExtractor = async (jwtToken: string, secret: string) => {
  const token = jwtToken.split(' ')[1];
  const payload = verify(token, secret);
  return payload;
};

export default jwtExtractor;
