import { prismaClient } from 'mp-prisma';
import { Request, Response, NextFunction } from 'express';
import imagekit from '@/utils/imagekit';

export const likeSong = async (req: Request, res: Response, next: NextFunction) => {
  const { song_id } = req.params;
  const { id } = req.user;

  try {
    const like = await prismaClient.songsLikes.create({
      data: {
        song_id: parseInt(song_id),
        user_id: id,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    next(error);
  }
};

export const createSong = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const files = req.files;
  const { name } = req.body;

  const image = files['image'][0];
  const audio = files['audio'][0];

  try {
    const uploadedImage = await imagekit.upload({
      file: image.buffer,
      fileName: image.originalname,
      useUniqueFileName: false,
      folder: '/music-player/songs/images/',
    });

    const uploadedAudio = await imagekit.upload({
      file: audio.buffer,
      fileName: `${Date.now()}_${name}.${image.originalname.at(-1)}`,
      useUniqueFileName: false,
      folder: '/music-player/songs/audio/',
    });

    await prismaClient.song.create({
      data: {
        name,
        image: uploadedImage.filePath,
        path: uploadedAudio.url,
        duration: 123456,
        artist_id: 1,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }

  try {
  } catch (error) {
    next(error);
  }
};
