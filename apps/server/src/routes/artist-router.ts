import { artistFollow, createArtist } from '@/controllers/artist/artist-create';
import { artistUnfollow } from '@/controllers/artist/artist-delete';
import { getArtist, getArtists } from '@/controllers/artist/artist-read';
import upload from '@/utils/multer-init';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getArtists);
router.get('/:artist_id', getArtist);

router.post('/:artist_id/follow', artistFollow);
router.post(
  '/switch',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  createArtist,
);

router.delete('/:artist_id/unfollow', artistUnfollow);

export default router;
