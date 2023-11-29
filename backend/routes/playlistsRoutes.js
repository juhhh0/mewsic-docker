import express from "express"
import { createPlaylist, getUserPlaylists, addTrackPlaylist, getPlaylistTracks } from "../controllers/playlistsControlller.js";
import requireAuth from "../utils/requireAuth.js";

const router = express.Router();

router.use(requireAuth);
router.post("/new", createPlaylist)
router.get("/", getUserPlaylists)
router.get("/:title", getPlaylistTracks)
router.post("/track", addTrackPlaylist)

export default router;