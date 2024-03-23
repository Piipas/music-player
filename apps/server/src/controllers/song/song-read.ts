import { prismaClient } from 'mp-prisma';
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

export const getPlaylistSongs = async (req: Request, res: Response, next: NextFunction) => {
  const { playlist_id } = req.params;
  const { limit, cursor } = req.query;

  try {
    const songs = await prismaClient.playlist.findMany({
      where: { id: parseInt(playlist_id) },
      select: {
        Songs: {
          select: {
            Song: true,
          },
          take: Number(limit) || 10,
          cursor: cursor
            ? { playlist_song_id: { playlist_id: parseInt(playlist_id), song_id: Number(cursor) } }
            : undefined,
        },
      },
    });

    res.status(200).json(songs);
  } catch (error) {}
};
