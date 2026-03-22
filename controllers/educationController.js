import Education from "../models/Education.js";
import fs from "fs";
import path from "path";

// Get all education
export const getAllEducation = async (req, res) => {
    try {
        const education = await Education.find().sort({ order: 1, startDate: -1 });
        res.status(200).json({ success: true, data: education });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single education
export const getEducationById = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ success: false, message: "Education not found" });
        }
        res.status(200).json({ success: true, data: education });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create education
export const createEducation = async (req, res) => {
    try {
        const educationData = { ...req.body };
        
        // Handle file upload
        if (req.file) {
            educationData.logo = `/uploads/images/${req.file.filename}`;
        }
        
        const education = await Education.create(educationData);
        res.status(201).json({ success: true, data: education, message: "Education created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update education
export const updateEducation = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // Handle new file upload
        if (req.file) {
            const oldEducation = await Education.findById(req.params.id);
            if (oldEducation && oldEducation.logo) {
                const oldLogoPath = path.join(process.cwd(), oldEducation.logo);
                if (fs.existsSync(oldLogoPath)) {
                    fs.unlinkSync(oldLogoPath);
                }
            }
            updateData.logo = `/uploads/images/${req.file.filename}`;
        }
        
        const education = await Education.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!education) {
            return res.status(404).json({ success: false, message: "Education not found" });
        }
        
        res.status(200).json({ success: true, data: education, message: "Education updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete education
export const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        
        if (!education) {
            return res.status(404).json({ success: false, message: "Education not found" });
        }
        
        // Delete associated logo
        if (education.logo) {
            const logoPath = path.join(process.cwd(), education.logo);
            if (fs.existsSync(logoPath)) {
                fs.unlinkSync(logoPath);
            }
        }
        
        await Education.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Education deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
