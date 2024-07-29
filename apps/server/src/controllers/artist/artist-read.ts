import { NextFunction, Request, Response } from 'express';
import { prismaClient } from 'mp-prisma';

export const getArtist = async (req: Request, res: Response, next: NextFunction) => {
  const { artist_id } = req.params;
  const id = req.user?.id || undefined;

  try {
    const artist = await prismaClient.artist.findFirstOrThrow({
      where: { id: parseInt(artist_id) },
      include: { Follows: id ? { where: { user_id: id } } : undefined },
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
      where: query
        ? { name: { contains: query as string, mode: 'insensitive' }, id: { not: { equals: 2 } } }
        : { id: { not: { equals: 2 } } },
      take: Number(limit) || 10,
    });

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};
