import { prismaClient } from 'mp-prisma';
import { Request, Response, NextFunction } from 'express';

export const getPlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { playlist_id } = req.params;
  const { id } = req.user;

  try {
    const playlist = await prismaClient.playlist.findFirstOrThrow({
      where: { id: parseInt(playlist_id) },
      include: { Likes: { where: { user_id: id } }, User: { select: { username: true } } },
    });

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export const getPlaylists = async (req: Request, res: Response, next: NextFunction) => {
  const { limit } = req.query;

  try {
    const playlists = await prismaClient.playlist.findMany({
      take: Number(limit) || 10,
    });

    res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
};
