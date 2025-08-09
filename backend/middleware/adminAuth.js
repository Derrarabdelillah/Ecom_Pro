const jwt = require('jsonwebtoken');

require('dotenv').config();


const adminAuth = async (req, res, next) => {

    try {

        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "No Token Availble" })
        }
        const decode_token = jwt.verify(token, process.env.JWT_SECRET);

        if (decode_token.email !== process.env.ADMIN_EMAIL || decode_token.password !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Not Authorized. Invalid Credentials" })
        }
        req.admin = decode_token; // Attach admin data to request
        next();
    } catch (error) {
        console.log(`This is the Error from catch of adminAuth Function` + error)
    }

}

module.exports = { adminAuth }