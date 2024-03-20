import { jwtExtractor } from '@/utils/jwt';
import { env } from 'env';
import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  let access_token = req.headers.authorization as string;
  try {
    if (!access_token) return res.status(401).json({ message: 'Unauthorizedd!' });

    const payload = jwtExtractor(access_token, env.JWT_ACCESS_TOKEN_SECRET);
    if (!payload) return res.status(401).json({ message: 'Unauthorized!' });

    next();
  } catch (error) {
    next(error);
  }
};
