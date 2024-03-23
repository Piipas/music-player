import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { env } from 'env';

import ArtistRouter from '@/routes/artist-router';
import SongRouter from '@/routes/song-router';
import PlaylistRouter from '@/routes/playlist-router';
import AuthRouter from '@/routes/auth-router';
import { Prisma } from '@prisma/client';
import { isAuthenticated } from '@/middlewares/isAuthenticated';

const app = express();
const port = env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use('/auth', AuthRouter);
app.use('/artists', isAuthenticated, ArtistRouter);
app.use('/songs', isAuthenticated, SongRouter);
app.use('/playlists', isAuthenticated, PlaylistRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
