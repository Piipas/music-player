import { likeSong } from '@/controllers/song/song-create';
import { unlikeSong } from '@/controllers/song/song-delete';
import { getArtistSongs, getHistory, getPlaylistSongs, getSong, streamSong } from '@/controllers/song/song-read';
import { Router } from 'express';

const router = Router();

router.get('/history', getHistory);
router.get('/:song_id', getSong);
router.get('/:song_id/stream', streamSong);
router.get('/playlist/:playlist_id', getPlaylistSongs);
router.get('/artist/:artist_id', getArtistSongs);

router.route('/:song_id/like').post(likeSong).delete(unlikeSong);

export default router;
