import Home from "../models/Home.js";
import fs from "fs";
import path from "path";

// Get home data
export const getHomeData = async (req, res) => {
    try {
        let home = await Home.findOne();
        if (!home) {
            home = await Home.create({});
        }
        res.status(200).json({ success: true, data: home });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update home data
export const updateHomeData = async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        if (req.file) {
            const oldHome = await Home.findOne();
            if (oldHome && oldHome.profileImage) {
                const oldImagePath = path.join(process.cwd(), oldHome.profileImage.replace(/^[/\\]+/, ''));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            const parentFolder = path.basename(path.dirname(req.file.path));
            updateData.profileImage = `/uploads/${parentFolder}/${req.file.filename}`;
        }
        
        let home = await Home.findOne();
        if (home) {
            home = await Home.findByIdAndUpdate(home._id, updateData, { new: true });
        } else {
            home = await Home.create(updateData);
        }
        
        res.status(200).json({ success: true, data: home, message: "Home data updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
