import { getPlaylist, getPlaylists } from '@/controllers/playlist/playlist-read';
import { Router } from 'express';

const router = Router();

router.get('/', getPlaylists);
router.get('/:playlist_id', getPlaylist);

export default router;
