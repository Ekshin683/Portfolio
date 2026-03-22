import express from "express";
import { 
    getAllSkills, 
    getSkillsByCategory,
    getSkillById, 
    createSkill, 
    updateSkill, 
    deleteSkill 
} from "../controllers/skillController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getAllSkills);
router.get("/category/:category", getSkillsByCategory);
router.get("/:id", getSkillById);

// Protected routes
router.post("/", verifyToken, upload.single('icon'), createSkill);
router.put("/:id", verifyToken, upload.single('icon'), updateSkill);
router.delete("/:id", verifyToken, deleteSkill);

export default router;
