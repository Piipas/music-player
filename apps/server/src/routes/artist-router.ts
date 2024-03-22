import { artistFollow } from '@/controllers/artist/artist-create';
import { artistUnfollow } from '@/controllers/artist/artist-delete';
import { getArtist, getArtists, getArtistSongs } from '@/controllers/artist/artist-read';
import { Router } from 'express';

const router = Router();

router.get('/', getArtists);
router.get('/:artist_id', getArtist);
router.get('/:artist_id/songs', getArtistSongs);

router.post('/follow/:artist_id', artistFollow);
router.delete('/unfollow/:artist_id', artistUnfollow);

export default router;
