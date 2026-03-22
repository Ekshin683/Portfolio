import express from "express";
import { 
    getAllAchievements, 
    getAchievementById, 
    createAchievement, 
    updateAchievement, 
    deleteAchievement 
} from "../controllers/achievementController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getAllAchievements);
router.get("/:id", getAchievementById);

// Protected routes
router.post("/", verifyToken, upload.single('image'), createAchievement);
router.put("/:id", verifyToken, upload.single('image'), updateAchievement);
router.delete("/:id", verifyToken, deleteAchievement);

export default router;
