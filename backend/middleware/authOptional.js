const jwt = require('jsonwebtoken');
const SecretKey = "3#3#3#3"

const authOptional = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, SecretKey);
            req.userId = decoded.id;
            req.user = decoded;
        }
        next();
    } catch (error) {
        next(); // Continue even if token is invalid
    }
};

module.exports = { authOptional };