import {
  getTracks,
  getTracksByArtist,
  getTracksByAlbum,
  createTrack,
  deleteTrack,
  togglePublicTrack,
  isLiked,
  likeTrack,
} from "../controllers/tracksController.js";
import {
  getUserAlbums,
  getUserArtists,
} from "../controllers/collectionController.js";
import express from "express";
import upload from "../utils/multer.js";
import requireAuth from "../utils/requireAuth.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", getTracks);

router.get("/artists", getUserArtists);
router.get("/albums", getUserAlbums);
router.get("/artist/:artist", getTracksByArtist);
router.get("/album/:album", getTracksByAlbum);

router.post(
  "/",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  createTrack
);

router.get("/liked/:id", isLiked);
router.post("/like/:id", likeTrack);

router.post("/:id", togglePublicTrack);

router.delete("/:id", deleteTrack);

export default router;
