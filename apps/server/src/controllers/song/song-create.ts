import { prismaClient } from 'mp-prisma';
import { Request, Response, NextFunction } from 'express';

export const likeSong = async (req: Request, res: Response, next: NextFunction) => {
  const { song_id } = req.params;
  const { id } = req.user;

  try {
    await prismaClient.songsLikes.create({
      data: {
        song_id: parseInt(song_id),
        user_id: id,
      },
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
