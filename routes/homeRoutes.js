import express from "express";
import { getHomeData, updateHomeData } from "../controllers/homeController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Public route
router.get("/", getHomeData);

// Protected route
router.put("/", verifyToken, upload.single('profileImage'), updateHomeData);

export default router;
