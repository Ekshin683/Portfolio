import Skill from "../models/Skill.js";
import fs from "fs";
import path from "path";

// Get all skills
export const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1, category: 1 });
        res.status(200).json({ success: true, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get skills by category
export const getSkillsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const skills = await Skill.find({ category }).sort({ order: 1 });
        res.status(200).json({ success: true, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single skill
export const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create skill
export const createSkill = async (req, res) => {
    try {
        const skillData = { ...req.body };
        
        // Handle file upload
        if (req.file) {
            skillData.icon = `/uploads/images/${req.file.filename}`;
        }
        
        const skill = await Skill.create(skillData);
        res.status(201).json({ success: true, data: skill, message: "Skill created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update skill
export const updateSkill = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // Handle new file upload
        if (req.file) {
            const oldSkill = await Skill.findById(req.params.id);
            if (oldSkill && oldSkill.icon) {
                const oldIconPath = path.join(process.cwd(), oldSkill.icon);
                if (fs.existsSync(oldIconPath)) {
                    fs.unlinkSync(oldIconPath);
                }
            }
            updateData.icon = `/uploads/images/${req.file.filename}`;
        }
        
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }
        
        res.status(200).json({ success: true, data: skill, message: "Skill updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete skill
export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({ success: false, message: "Skill not found" });
        }
        
        // Delete associated icon
        if (skill.icon) {
            const iconPath = path.join(process.cwd(), skill.icon);
            if (fs.existsSync(iconPath)) {
                fs.unlinkSync(iconPath);
            }
        }
        
        await Skill.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
