const jwt = require('jsonwebtoken');
const SecretKey = "3#3#3#3";

const authUser = async (req, res, next) => {
    try {
        // 1. Check Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authorization header missing' 
            });
        }

        // 2. Extract token
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Bearer token missing' 
            });
        }

        // 3. Verify token
        const decoded = jwt.verify(token, SecretKey);
        
        // 4. Validate decoded payload
        if (!decoded._id) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token payload' 
            });
        }

        // 5. Attach user ID to request
        req.userId = decoded.id;
        next();

    } catch (error) {
        console.error('Authentication Error:', error.message);
        
        return res.status(401).json({ 
            success: false, 
            message,
            error: error.message 
        });
    }
};

module.exports = authUser;