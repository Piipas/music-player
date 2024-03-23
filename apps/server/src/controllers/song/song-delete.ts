import prismaClient from '@/utils/prisma-client';
import { Request, Response, NextFunction } from 'express';

export const unlikeSong = async (req: Request, res: Response, next: NextFunction) => {
  const { song_id } = req.params;
  const { id } = req.user;

  try {
    await prismaClient.songsLikes.delete({
      where: {
        song_user_id: { song_id: parseInt(song_id), user_id: id },
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
