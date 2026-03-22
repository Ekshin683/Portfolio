import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    generalTitle: {
        type: String,
        default: "General CV"
    },
    generalCvFile: {
        type: String
    },
    generalCvFileType: {
        type: String,
        default: "application/pdf"
    },
    technicalTitle: {
        type: String,
        default: "Technical CV"
    },
    technicalCvFile: {
        type: String,
    },
    technicalCvFileType: {
        type: String,
        default: "application/pdf"
    },
    // Legacy fields kept for backward compatibility with existing data
    title: {
        type: String
    },
    cvFile: {
        type: String
    },
    cvImage: {
        type: String
    },
    cvFileType: {
        type: String,
        default: "application/pdf"
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model("Resume", resumeSchema);
