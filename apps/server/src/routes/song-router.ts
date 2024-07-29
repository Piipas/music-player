import { createSong, likeSong } from '@/controllers/song/song-create';
import { unlikeSong } from '@/controllers/song/song-delete';
import { getArtistSongs, getHistory, getPlaylistSongs, getSong, streamSong } from '@/controllers/song/song-read';
import { Router } from 'express';
import upload from '@/utils/multer-init';
import { authNotRequired, isAuthenticated } from '@/middlewares/isAuthenticated';

const router: Router = Router();

router.get('/history', isAuthenticated, getHistory);
router.get('/:song_id', getSong);
router.get('/:song_id/stream', streamSong);
router.get('/playlist/:playlist_id', getPlaylistSongs);
router.get('/artist/:artist_id', authNotRequired, getArtistSongs);

router.post('/:song_id/like', isAuthenticated, likeSong);
router.post(
  '/',
  isAuthenticated,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  createSong,
);

router.delete('/:song_id/unlike', isAuthenticated, unlikeSong);

export default router;
