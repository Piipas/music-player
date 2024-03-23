import { prismaClient } from 'mp-prisma';
import { Request, Response, NextFunction } from 'express';

export const artistUnfollow = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { artist_id } = req.params;

  try {
    await prismaClient.artistsFollows.delete({
      where: { artist_user_id: { artist_id: parseInt(artist_id), user_id: id } },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
