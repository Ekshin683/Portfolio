import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: true,
        trim: true
    },
    degree: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    currentlyStudying: {
        type: Boolean,
        default: false
    },
    grade: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    logo: {
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

export default mongoose.model("Education", educationSchema);
