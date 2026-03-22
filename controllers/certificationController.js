import Certification from "../models/Certification.js";
import fs from "fs";
import path from "path";

// Get all certifications
export const getAllCertifications = async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ order: 1, date: -1 });
        res.status(200).json({ success: true, data: certifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single certification
export const getCertificationById = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification not found" });
        }
        res.status(200).json({ success: true, data: certification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create certification
export const createCertification = async (req, res) => {
    try {
        const certificationData = { ...req.body };
        
        // Handle file upload
        if (req.file) {
            certificationData.image = `/uploads/images/${req.file.filename}`;
        }
        
        const certification = await Certification.create(certificationData);
        res.status(201).json({ success: true, data: certification, message: "Certification created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update certification
export const updateCertification = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // Handle new file upload
        if (req.file) {
            const oldCertification = await Certification.findById(req.params.id);
            if (oldCertification && oldCertification.image) {
                const oldImagePath = path.join(process.cwd(), oldCertification.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = `/uploads/images/${req.file.filename}`;
        }
        
        const certification = await Certification.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification not found" });
        }
        
        res.status(200).json({ success: true, data: certification, message: "Certification updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete certification
export const deleteCertification = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        
        if (!certification) {
            return res.status(404).json({ success: false, message: "Certification not found" });
        }
        
        // Delete associated image
        if (certification.image) {
            const imagePath = path.join(process.cwd(), certification.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await Certification.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Certification deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
