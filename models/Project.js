import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [{
        type: String
    }],
    image: {
        type: String,
        default: ""
    },
    liveLink: {
        type: String,
        default: ""
    },
    githubLink: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'desktop', 'other'],
        default: 'web'
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model("Project", projectSchema);
