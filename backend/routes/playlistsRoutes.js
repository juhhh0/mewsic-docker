import express from "express"
import { createPlaylist } from "../controllers/playlistsControlller.js";
import requireAuth from "../utils/requireAuth.js";

const router = express.Router();

router.use(requireAuth);
router.post("/new", createPlaylist)

export default router;