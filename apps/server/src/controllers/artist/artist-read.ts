import { NextFunction, Request, Response } from 'express';
import prismaClient from '@/utils/prisma-client';

export const getArtist = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const artist = await prismaClient.artist.findFirstOrThrow({
      where: { id: parseInt(id) },
      include: {
        Songs: {
          include: {
            SongsCategories: true,
          },
        },
      },
    });

    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
};
