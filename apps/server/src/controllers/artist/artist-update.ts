import { NextFunction, Request, Response } from 'express';
import { prismaClient } from 'mp-prisma';

export const updateArtist = async (req: Request, res: Response, next: NextFunction) => {};

export const toggleFollowArtist = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { artist_id } = req.params;

  try {
    const isFollowing = await prismaClient.artistsFollows.count({
      where: { artist_id: parseInt(artist_id), user_id: id },
    });

    const toggleFollow = await prismaClient.artist.update({
      where: { id: parseInt(artist_id), NOT: [{ user_id: id }] },
      data: {
        Follows: isFollowing
          ? { delete: { artist_user_id: { artist_id: parseInt(artist_id), user_id: id } } }
          : { create: [{ user_id: id }] },
      },
    });
    if (!toggleFollow) return res.sendStatus(400);

    res.status(200).json({ following: !isFollowing });
  } catch (error) {
    console.log(error);
  }
};
