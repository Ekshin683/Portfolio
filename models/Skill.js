import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['frontend', 'backend', 'database', 'tools', 'soft-skills', 'Programming Languages', 'others'],
        required: true
    },
    icon: {
        type: String,
        default: ""
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model("Skill", skillSchema);
