import { artistFollow } from '@/controllers/artist/artist-create';
import { artistUnfollow } from '@/controllers/artist/artist-delete';
import { getArtist, getArtists } from '@/controllers/artist/artist-read';
import { Router } from 'express';

const router = Router();

router.get('/', getArtists);
router.get('/:artist_id', getArtist);

router.route('/:artist_id/follow').post(artistFollow).delete(artistUnfollow);

export default router;
