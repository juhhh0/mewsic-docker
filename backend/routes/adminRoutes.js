import express from "express";
import requireAuth from "../utils/requireAuth.js";
import {
  getTables,
  contactAdmin,
  adminDeleteUser,
  adminDeleteTrack,
  adminDeleteAlbum,
  adminDeleteArtist,
} from "../controllers/adminController.js";
import { deletePlaylist } from "../controllers/playlistsControlller.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getTables);
router.post("/contact", contactAdmin);

router.delete("/users/:id", adminDeleteUser);
router.delete("/tracks/:id", adminDeleteTrack);
router.delete("/albums/:id", adminDeleteAlbum);
router.delete("/artists/:id", adminDeleteArtist);
router.delete("/playlists/:id", deletePlaylist);

export default router;
