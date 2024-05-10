import { prismaClient } from 'mp-prisma';
import { Request, Response, NextFunction } from 'express';
import imagekit from '@/utils/imagekit-init';

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
  const files = req.files as { [key: string]: Express.Multer.File[] };
  const { name } = req.body;

  if (!files) return res.status(400).json({ message: 'Song Audio/Image are required!' });

  try {
    const image = files['image'][0];
    const audio = files['audio'][0];

    const user = await prismaClient.user.findUnique({
      where: { id },
      select: { Artist: { select: { id: true } } },
    });

    if (!user?.Artist) return res.status(400).json({ message: 'You are not an artist!' });

    const uploadedImage = await imagekit.upload({
      file: image.buffer,
      fileName: `${Date.now()}_${name}.${image.originalname.split('.').at(-1)}`,
      useUniqueFileName: false,
      folder: '/music-player/songs/images/',
    });

    const uploadedAudio = await imagekit.upload({
      file: audio.buffer,
      fileName: `${Date.now()}_${name}.${audio.originalname.split('.').at(-1)}`,
      useUniqueFileName: false,
      folder: '/music-player/songs/audio/',
    });

    await prismaClient.song.create({
      data: {
        name,
        image: uploadedImage.filePath,
        path: uploadedAudio.url,
        duration: 123456,
        artist_id: user?.Artist?.id,
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
