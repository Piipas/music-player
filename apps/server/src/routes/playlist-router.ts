import { likePlaylist } from '@/controllers/playlist/playlist-create';
import { unlikePlaylist } from '@/controllers/playlist/playlist-delete';
import { getPlaylist, getPlaylists } from '@/controllers/playlist/playlist-read';
import { Router } from 'express';

const router = Router();

router.get('/', getPlaylists);
router.get('/:playlist_id', getPlaylist);

router.route('/:playlist_id/like').post(likePlaylist).delete(unlikePlaylist);

export default router;
