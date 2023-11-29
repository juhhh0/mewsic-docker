import express from "express";
import requireAuth from "../utils/requireAuth.js";
import { search } from "../controllers/collectionController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/:query", search);

export default router;
