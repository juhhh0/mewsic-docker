import express from "express"
import { createPlaylist, getUserPlaylists, addTrackPlaylist, getPlaylistTracks, deletePlaylist } from "../controllers/playlistsControlller.js";
import requireAuth from "../utils/requireAuth.js";

const router = express.Router();

router.use(requireAuth);
router.post("/new", createPlaylist)
router.get("/", getUserPlaylists)
router.get("/:title", getPlaylistTracks)
router.delete("/:id", deletePlaylist)
router.post("/track", addTrackPlaylist)

export default router;