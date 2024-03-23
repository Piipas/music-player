import prismaClient from '@/utils/prisma-client';
import { Request, Response, NextFunction } from 'express';

export const artistFollow = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { artist_id } = req.params;

  try {
    await prismaClient.artistsFollows.create({
      data: {
        user_id: id,
        artist_id: parseInt(artist_id),
      },
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
