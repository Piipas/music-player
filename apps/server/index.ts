import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { env } from 'env';

import ArtistRouter from '@/routes/artist-router';
import AuthRouter from '@/routes/auth-router';
import { Prisma } from '@prisma/client';

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/', AuthRouter);
app.use('/artists', ArtistRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(error);
    switch (error.code) {
      case 'P2025':
        return res.status(404).json({ message: 'Item you are looking for does not exist!' });
    }
  }
  res.status(500).json({ message: 'Internal Server Error!' });
});

app.listen(port || 4000, () => console.log(`Server started at http://localhost:${port}`));
