import { Request, Response, NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import prismaClient from '@/utils/prisma-client';
import { sign } from 'jsonwebtoken';
import { env } from 'env';
import { jwtExtractor } from '@/utils/jwt';

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = await prismaClient.user.findFirst({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Username or password is incorrect!' });

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) return res.status(401).json({ message: 'Username or password is incorrect!' });

    const access_token = sign({ id: user.id }, env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY_DURATION,
    });
    const refresh_token = sign({ id: user.id }, env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRY_DURATION,
    });

    res.status(200).cookie('__rf__', refresh_token, { httpOnly: true, secure: true }).json({ access_token });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;
  const encryptedPassword = await hash(password, 10);

  try {
    const user = await prismaClient.user.create({
      data: { username, email, password: encryptedPassword },
    });

    const access_token = sign({ id: user.id }, env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY_DURATION,
    });
    const refresh_token = sign({ id: user.id }, env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRY_DURATION,
    });

    res.status(200).cookie('__rf__', refresh_token, { httpOnly: true, secure: true }).json(access_token);

    res.status(200).json(access_token);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.__rf__;

  try {
    const payload = jwtExtractor(refreshToken, env.JWT_REFRESH_TOKEN_SECRET);

    if (!payload) return res.status(401).json({ message: 'Refresh token expired or not valid!' });

    const access_token = sign({ id: payload.id }, env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY_DURATION,
    });
    const refresh_token = sign({ id: payload.id }, env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRY_DURATION,
    });

    res
      .status(200)
      .cookie('__rf__', refresh_token, { httpOnly: true, secure: true, sameSite: 'strict' })
      .json(access_token);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
