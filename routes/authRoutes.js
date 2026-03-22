import express from "express";
import { generateAdminToken } from "../auth/authMiddleware.js";

const router = express.Router();

// Route to get admin token using security key
router.post("/verify", generateAdminToken);

export default router;
