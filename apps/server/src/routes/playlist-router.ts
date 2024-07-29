import { likePlaylist } from '@/controllers/playlist/playlist-create';
import { unlikePlaylist } from '@/controllers/playlist/playlist-delete';
import { getPlaylist, getPlaylists } from '@/controllers/playlist/playlist-read';
import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getPlaylists);
router.get('/:playlist_id', getPlaylist);

router.post('/:playlist_id/like', isAuthenticated, likePlaylist);
router.delete('/:playlist_id/unlike', isAuthenticated, unlikePlaylist);

export default router;
