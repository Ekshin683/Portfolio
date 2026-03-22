import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    organization: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    certificateLink: {
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

export default mongoose.model("Certification", certificationSchema);
