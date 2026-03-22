import Resume from "../models/Resume.js";
import fs from "fs";
import path from "path";

const toAbsolutePath = (storedPath) => {
    if (!storedPath) return null;
    return path.join(process.cwd(), storedPath.replace(/^[/\\]+/, ''));
};

const getStoredResumePath = (resume, cvType) => {
    if (cvType === "technical") {
        return resume?.technicalCvFile;
    }
    return resume?.generalCvFile || resume?.cvFile || resume?.cvImage;
};

// Get resume (usually only one document)
export const getResume = async (req, res) => {
    try {
        let resume = await Resume.findOne();
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }

        // Read-time legacy fallback mapping
        const data = resume.toObject();
        if (!data.generalCvFile && (data.cvFile || data.cvImage)) {
            data.generalCvFile = data.cvFile || data.cvImage;
            data.generalCvFileType = data.cvFileType || "application/pdf";
            data.generalTitle = data.title || "General CV";
        }

        if (!data.generalTitle) data.generalTitle = "General CV";
        if (!data.technicalTitle) data.technicalTitle = "Technical CV";

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create or update resume
export const createOrUpdateResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a CV file (PDF/DOC/DOCX)" });
        }

        const cvType = (req.body.cvType || "general").toLowerCase() === "technical" ? "technical" : "general";

        const fileFolder = path.basename(path.dirname(req.file.path));
        const uploadedPath = `/uploads/${fileFolder}/${req.file.filename}`;
        
        // Check if resume exists
        let resume = await Resume.findOne();
        
        if (resume) {
            // Delete old CV file
            const oldStoredPath = getStoredResumePath(resume, cvType);
            if (oldStoredPath) {
                const oldPath = toAbsolutePath(oldStoredPath);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            const updateData = cvType === "technical"
                ? {
                    technicalTitle: req.body.title || resume.technicalTitle || "Technical CV",
                    technicalCvFile: uploadedPath,
                    technicalCvFileType: req.file.mimetype,
                    uploadedAt: Date.now()
                }
                : {
                    generalTitle: req.body.title || resume.generalTitle || resume.title || "General CV",
                    generalCvFile: uploadedPath,
                    generalCvFileType: req.file.mimetype,
                    uploadedAt: Date.now()
                };
            
            // Update existing resume
            resume = await Resume.findByIdAndUpdate(
                resume._id,
                updateData,
                { new: true, runValidators: true }
            );
            
            res.status(200).json({ success: true, data: resume, message: `${cvType === "technical" ? "Technical" : "General"} CV updated successfully` });
        } else {
            const resumeData = cvType === "technical"
                ? {
                    technicalTitle: req.body.title || "Technical CV",
                    technicalCvFile: uploadedPath,
                    technicalCvFileType: req.file.mimetype,
                    generalTitle: "General CV"
                }
                : {
                    generalTitle: req.body.title || "General CV",
                    generalCvFile: uploadedPath,
                    generalCvFileType: req.file.mimetype,
                    technicalTitle: "Technical CV"
                };

            // Create new resume
            resume = await Resume.create(resumeData);
            res.status(201).json({ success: true, data: resume, message: `${cvType === "technical" ? "Technical" : "General"} CV created successfully` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete resume
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne();
        
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }
        
        // Delete all stored CV files (including legacy)
        const pathsToDelete = [
            resume.generalCvFile,
            resume.technicalCvFile,
            resume.cvFile,
            resume.cvImage
        ].filter(Boolean);

        pathsToDelete.forEach((storedPath) => {
            const filePath = toAbsolutePath(storedPath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
        
        await Resume.findByIdAndDelete(resume._id);
        res.status(200).json({ success: true, message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
