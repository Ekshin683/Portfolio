import jwt from "jsonwebtoken";

// Middleware to verify security key
export const verifySecurityKey = (req, res, next) => {
    try {
        const securityKey = req.headers['x-security-key'];
        
        if (!securityKey) {
            return res.status(401).json({ 
                success: false, 
                message: "Security key required" 
            });
        }
        
        if (securityKey !== process.env.SECURITY_KEY) {
            return res.status(403).json({ 
                success: false, 
                message: "Invalid security key" 
            });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Authentication error" 
        });
    }
};

// Generate admin token after security key verification
export const generateAdminToken = (req, res) => {
    try {
        const securityKey = req.body.securityKey;
        
        if (!securityKey) {
            return res.status(401).json({ 
                success: false, 
                message: "Security key required" 
            });
        }
        
        if (securityKey !== process.env.SECURITY_KEY) {
            return res.status(403).json({ 
                success: false, 
                message: "Invalid security key" 
            });
        }
        
        const token = jwt.sign(
            { role: 'admin' }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }
        );
        
        return res.status(200).json({ 
            success: true, 
            token,
            message: "Authentication successful" 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Authentication error" 
        });
    }
};

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access token required" 
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: "Invalid or expired token" 
        });
    }
};
