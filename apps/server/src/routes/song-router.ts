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

router.post('/:song_id/like', likeSong);
router.delete('/:song_id/unlike', unlikeSong);

export default router;
