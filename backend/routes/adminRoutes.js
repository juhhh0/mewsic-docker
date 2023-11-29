import express from "express";
import requireAuth from "../utils/requireAuth.js";
import { getTables, contactAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getTables)
router.post("/contact", contactAdmin)

export default router;
