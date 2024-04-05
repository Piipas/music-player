import { createSong, likeSong } from '@/controllers/song/song-create';
import { unlikeSong } from '@/controllers/song/song-delete';
import { getArtistSongs, getHistory, getPlaylistSongs, getSong, streamSong } from '@/controllers/song/song-read';
import { Router } from 'express';
import upload from '@/utils/multer';

const router = Router();

router.get('/history', getHistory);
router.get('/:song_id', getSong);
router.get('/:song_id/stream', streamSong);
router.get('/playlist/:playlist_id', getPlaylistSongs);
router.get('/artist/:artist_id', getArtistSongs);

router.post('/:song_id/like', likeSong);
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  createSong,
);

router.delete('/:song_id/unlike', unlikeSong);

export default router;
