import Achievement from "../models/Achievement.js";
import fs from "fs";
import path from "path";

// Get all achievements
export const getAllAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ order: 1, date: -1 });
        res.status(200).json({ success: true, data: achievements });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single achievement
export const getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (!achievement) {
            return res.status(404).json({ success: false, message: "Achievement not found" });
        }
        res.status(200).json({ success: true, data: achievement });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create achievement
export const createAchievement = async (req, res) => {
    try {
        const achievementData = { ...req.body };
        
        // Handle file upload
        if (req.file) {
            achievementData.image = `/uploads/images/${req.file.filename}`;
        }
        
        const achievement = await Achievement.create(achievementData);
        res.status(201).json({ success: true, data: achievement, message: "Achievement created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update achievement
export const updateAchievement = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // Handle new file upload
        if (req.file) {
            const oldAchievement = await Achievement.findById(req.params.id);
            if (oldAchievement && oldAchievement.image) {
                const oldImagePath = path.join(process.cwd(), oldAchievement.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = `/uploads/images/${req.file.filename}`;
        }
        
        const achievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!achievement) {
            return res.status(404).json({ success: false, message: "Achievement not found" });
        }
        
        res.status(200).json({ success: true, data: achievement, message: "Achievement updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete achievement
export const deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        
        if (!achievement) {
            return res.status(404).json({ success: false, message: "Achievement not found" });
        }
        
        // Delete associated image
        if (achievement.image) {
            const imagePath = path.join(process.cwd(), achievement.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await Achievement.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Achievement deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
