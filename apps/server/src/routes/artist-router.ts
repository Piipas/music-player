import { getArtist } from '@/controllers/artist/artist-read';
import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { Router } from 'express';

const router = Router();

router.get('/:id', isAuthenticated, getArtist);

export default router;
