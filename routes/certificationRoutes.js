import express from "express";
import { 
    getAllCertifications, 
    getCertificationById, 
    createCertification, 
    updateCertification, 
    deleteCertification 
} from "../controllers/certificationController.js";
import { verifyToken } from "../auth/authMiddleware.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Public routes
router.get("/", getAllCertifications);
router.get("/:id", getCertificationById);

// Protected routes
router.post("/", verifyToken, upload.single('image'), createCertification);
router.put("/:id", verifyToken, upload.single('image'), updateCertification);
router.delete("/:id", verifyToken, deleteCertification);

export default router;
