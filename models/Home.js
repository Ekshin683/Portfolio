import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: "Professional Portfolio"
    },
    tagline: {
        type: String,
        default: "Showcasing Excellence in Development & Innovation"
    }
}, {
    timestamps: true
});

export default mongoose.model("Home", homeSchema);
