import express from "express"
import { createPlaylist, getUserPlaylists } from "../controllers/playlistsControlller.js";
import requireAuth from "../utils/requireAuth.js";

const router = express.Router();

router.use(requireAuth);
router.post("/new", createPlaylist)
router.get("/", getUserPlaylists)

export default router;