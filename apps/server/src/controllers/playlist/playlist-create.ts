import { Request, Response, NextFunction } from 'express';
import { prismaClient } from 'mp-prisma';

export const likePlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { playlist_id } = req.params;
  const { id } = req.user;

  try {
    await prismaClient.playlistsLikes.create({
      data: {
        playlist_id: parseInt(playlist_id),
        user_id: id,
      },
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
