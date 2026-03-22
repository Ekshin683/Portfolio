import express from "express";
import { 
    getAllEducation, 
    getEducationById, 
    createEducation, 
    updateEducation, 
    deleteEducation 
} from "../controllers/educationController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getAllEducation);
router.get("/:id", getEducationById);

// Protected routes
router.post("/", verifyToken, upload.single('logo'), createEducation);
router.put("/:id", verifyToken, upload.single('logo'), updateEducation);
router.delete("/:id", verifyToken, deleteEducation);

export default router;
