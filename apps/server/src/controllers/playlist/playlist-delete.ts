import prismaClient from '@/utils/prisma-client';
import { Request, Response, NextFunction } from 'express';

export const unlikePlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { playlist_id } = req.params;
  const { id } = req.user;

  try {
    await prismaClient.playlistsLikes.delete({
      where: {
        playlist_user_id: { playlist_id: parseInt(playlist_id), user_id: id },
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
