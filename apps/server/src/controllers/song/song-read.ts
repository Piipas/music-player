import prismaClient from '@/utils/prisma-client';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import util from 'util';
import fs from 'fs';

export const getSong = async (req: Request, res: Response, next: NextFunction) => {
  const { song_id } = req.params;

  try {
    const song = await prismaClient.song.findFirstOrThrow({
      where: { id: parseInt(song_id) },
      include: { Artist: true },
    });

    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
};

export const streamSong = async (req: Request, res: Response, next: NextFunction) => {
  const { song_id } = req.params;
  const readFile = util.promisify(fs.readFile);

  try {
    const song = await prismaClient.song.findFirstOrThrow({
      where: { id: parseInt(song_id) },
      select: { path: true },
    });

    const file = await readFile(path.join(__dirname, `../../../data/songs/${song.path}`));

    res
      .setHeader('Content-Disposition', `attachment; filename=${song.path}`)
      .setHeader('Content-Type', 'audio/mp3')
      .write(file, 'binary');
    res.end();
  } catch (error) {
    next(error);
  }
};
