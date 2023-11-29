import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  isResetTokenValid,
  resetPassword,
  getProfile,
  updateProfile,
} from "../controllers/usersController.js";
import express from "express";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/profile/:id", getProfile);
router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);
router.get("/verify-token", isResetTokenValid, (req, res) => {
  res.json({ succes: true });
});
router.post(
  "/profile/:id",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  updateProfile
);

export default router;
