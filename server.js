import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";

// Import database connection
import dbConnect from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// Configure environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create upload directories if they don't exist
const uploadDirs = [
    'uploads',
    'uploads/images',
    'uploads/documents',
    'uploads/files'
];

uploadDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✓ Created directory: ${dir}`);
    }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/resume", resumeRoutes);

// Health check route
app.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Portfolio API is running",
        version: "1.0.0"
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: "Route not found" 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: err.message || "Internal server error" 
    });
});

// Connect to database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`\n========================================`);
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`✓ API URL: http://localhost:${PORT}`);
            console.log(`========================================\n`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
