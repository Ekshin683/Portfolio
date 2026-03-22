import Project from "../models/Project.js";
import fs from "fs";
import path from "path";

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single project
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create project
export const createProject = async (req, res) => {
    try {
        const projectData = { ...req.body };
        
        // Handle file upload
        if (req.file) {
            projectData.image = `/uploads/images/${req.file.filename}`;
        }
        
        const project = await Project.create(projectData);
        res.status(201).json({ success: true, data: project, message: "Project created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update project
export const updateProject = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        // Handle new file upload
        if (req.file) {
            const oldProject = await Project.findById(req.params.id);
            if (oldProject && oldProject.image) {
                // Delete old image
                const oldImagePath = path.join(process.cwd(), oldProject.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = `/uploads/images/${req.file.filename}`;
        }
        
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        
        res.status(200).json({ success: true, data: project, message: "Project updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        
        // Delete associated image
        if (project.image) {
            const imagePath = path.join(process.cwd(), project.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
