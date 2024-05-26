import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './env';

import ArtistRouter from '@/routes/artist-router';
import SongRouter from '@/routes/song-router';
import PlaylistRouter from '@/routes/playlist-router';
import AuthRouter from '@/routes/auth-router';
import { Prisma } from 'mp-prisma';
import { isAuthenticated } from '@/middlewares/isAuthenticated';

const app = express();
const port = env.PORT || 4000;

app
  .use(
    cors({
      origin: function (origin, callback) {
        if (env.CORS_WHITELIST.split(',').indexOf(origin as string) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      allowedHeaders: ['Authorization', 'Content-Type'],
    }),
  )
  .use(helmet())
  .use(express.json())
  .use(cookieParser())

  .use('/auth', AuthRouter)
  .use('/artists', isAuthenticated, ArtistRouter)
  .use('/songs', isAuthenticated, SongRouter)
  .use('/playlists', isAuthenticated, PlaylistRouter)

  .use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (env.NODE_ENV === 'development') console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return res.status(409).json({ message: 'You are trying to insert an item with an existing unique value!' });
        case 'P2025':
          return res.status(404).json({ message: 'The item you are looking for, does not exist!' });
      }
    }
    res.status(500).json({ message: 'Internal Server Error!' });
  })

  .listen(port, () => console.log(`Server started at http://localhost:${port}`));
