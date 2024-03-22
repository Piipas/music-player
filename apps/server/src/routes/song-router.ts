import { getSong, streamSong } from '@/controllers/song/song-read';
import { Router } from 'express';

const router = Router();

router.get('/:song_id', getSong);
router.get('/stream/:song_id', streamSong);

export default router;
