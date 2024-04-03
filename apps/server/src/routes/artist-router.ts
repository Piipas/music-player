import { artistFollow } from '@/controllers/artist/artist-create';
import { artistUnfollow } from '@/controllers/artist/artist-delete';
import { getArtist, getArtists } from '@/controllers/artist/artist-read';
import { Router } from 'express';

const router = Router();

router.get('/', getArtists);
router.get('/:artist_id', getArtist);

router.post('/:artist_id/follow', artistFollow);
router.delete('/:artist_id/unfollow', artistUnfollow);

export default router;
