import { prismaClient } from 'mp-prisma';
import { Request, Response, NextFunction } from 'express';
import imagekit from '@/utils/imagekit';

export const artistFollow = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { artist_id } = req.params;

  try {
    await prismaClient.artistsFollows.create({
      data: {
        user_id: id,
        artist_id: parseInt(artist_id),
      },
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export const createArtist = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { name } = req.body;
  const files = req.files as { [key: string]: Express.Multer.File[] };

  try {
    const avatar = files['avatar'][0];
    const cover = files['cover'][0];

    const uploadedAvatar = await imagekit.upload({
      file: avatar.buffer,
      fileName: `${Date.now()}_${name}.${avatar.originalname.split('.').at(-1)}`,
      useUniqueFileName: false,
      folder: '/music-player/artists/avatars',
    });

    const uploadedCover = await imagekit.upload({
      file: cover.buffer,
      fileName: `${Date.now()}_${name}.${cover.originalname.split('.').at(-1)}`,
      useUniqueFileName: false,
      folder: '/music-player/artists/covers',
    });

    const artist = await prismaClient.artist.create({
      data: {
        user_id: id,
        name,
        avatar: uploadedAvatar.filePath,
        cover: uploadedCover.filePath,
      },
    });

    res.status(201).json(artist);
  } catch (error) {
    next(error);
  }
};
