import { NextFunction, Request, Response } from 'express';
import prismaClient from '@/utils/prisma-client';

export const getArtist = async (req: Request, res: Response, next: NextFunction) => {
  const { artist_id } = req.params;

  try {
    const artist = await prismaClient.artist.findFirstOrThrow({
      where: { id: parseInt(artist_id) },
    });

    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
};

export const getArtists = async (req: Request, res: Response, next: NextFunction) => {
  const { limit } = req.query;

  try {
    const artists = await prismaClient.artist.findMany({
      take: Number(limit) || 10,
    });

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};

export const getArtistSongs = async (req: Request, res: Response, next: NextFunction) => {
  const { artist_id } = req.params;
  const { limit, cursor } = req.query;

  try {
    const songs = await prismaClient.song.findMany({
      where: { artist_id: parseInt(artist_id) },
      take: Number(limit) || 10,
      cursor: { id: Number(cursor) || 1 },
    });

    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};
