const jwt = require('jsonwebtoken');
const SecretKey = "3#3#3#3";

const authUser = async (req, res, next) => {

    try {
        // Get Token from header
        const token = req.headers.authorization?.split(' ')[1];

        // if there is no token
        if ( !token ) {
            return res.status(401).json({success: false, message: 'Please login first' });
        }

        // Verify Token
        const decoded = jwt.verify(token, SecretKey);

        // Attach user ID to request
        req.userId = decoded.id;
        next()

    } catch (error) {
        console.log('Auth User Cart Error:' + error);
        res.status(401).json({ error: "Invalid token!" });
    }

};

module.exports = authUser;