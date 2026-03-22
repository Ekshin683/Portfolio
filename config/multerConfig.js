import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Root of the project (one level up from config/)
const PROJECT_ROOT = path.join(__dirname, '..');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const normalizedField = (file.fieldname || '').toLowerCase();
        let uploadPath = path.join(PROJECT_ROOT, 'uploads');
        
        // Determine folder based on fieldname
        if (normalizedField.includes('image') || normalizedField.includes('logo') || normalizedField.includes('icon')) {
            uploadPath = path.join(uploadPath, 'images');
        } else if (normalizedField.includes('resume') || normalizedField.includes('certificate') || normalizedField.includes('cvfile')) {
            uploadPath = path.join(uploadPath, 'documents');
        } else {
            uploadPath = path.join(uploadPath, 'files');
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const normalizedField = (file.fieldname || '').toLowerCase();

    // Allowed file types
    const allowedImageTypes = /jpeg|jpg|png|gif|svg|webp/;
    const allowedDocTypes = /pdf|doc|docx/;
    
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    
    if (normalizedField.includes('image') || normalizedField.includes('logo') || normalizedField.includes('icon')) {
        if (allowedImageTypes.test(extname.slice(1)) && mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    } else if (normalizedField.includes('resume') || normalizedField.includes('certificate') || normalizedField.includes('cvfile')) {
        if (allowedDocTypes.test(extname.slice(1)) || mimetype.startsWith('application/')) {
            cb(null, true);
        } else {
            cb(new Error('Only document files are allowed!'), false);
        }
    } else {
        cb(null, true);
    }
};

// Create multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export default upload;
