import { NextFunction, Request, Response } from 'express';
import { prismaClient } from 'mp-prisma';

export const getArtist = async (req: Request, res: Response, next: NextFunction) => {
  const { artist_id } = req.params;
  const { id } = req.user;

  try {
    const artist = await prismaClient.artist.findFirstOrThrow({
      where: { id: parseInt(artist_id) },
      include: { Follows: { where: { user_id: id } } },
    });

    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
};

export const getArtists = async (req: Request, res: Response, next: NextFunction) => {
  const { limit, query } = req.query;

  try {
    const artists = await prismaClient.artist.findMany({
      where: query ? { name: { contains: query as string, mode: 'insensitive' } } : undefined,
      take: Number(limit) || 10,
    });

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};
