import express from "express";
import { 
    getResume, 
    createOrUpdateResume, 
    deleteResume 
} from "../controllers/resumeController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getResume);

// Protected routes - Upload CV file (PDF/DOC/DOCX, requires authentication)
router.post("/", verifyToken, upload.single('cvFile'), createOrUpdateResume);
router.put("/", verifyToken, upload.single('cvFile'), createOrUpdateResume);
router.delete("/", verifyToken, deleteResume);

export default router;
