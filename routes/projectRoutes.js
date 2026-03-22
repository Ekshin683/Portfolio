import express from "express";
import { 
    getAllProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject 
} from "../controllers/projectController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Protected routes (require authentication)
router.post("/", verifyToken, upload.single('image'), createProject);
router.put("/:id", verifyToken, upload.single('image'), updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;
