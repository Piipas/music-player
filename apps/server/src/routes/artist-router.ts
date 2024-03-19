import { getArtist } from '@/controllers/artist/artist-read';
import { Router } from 'express';

const router = Router();

router.get('/:id', getArtist);

export default router;
