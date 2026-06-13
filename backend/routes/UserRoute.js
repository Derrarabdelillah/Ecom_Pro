const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");
const rateLimit = require('express-rate-limit')

// dotenv
require('dotenv').config()
const JWT_SECRET = "#3#3#3#3";

const createToken = async (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })
}


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // each IP can only make 5 requests to auth endpoints per windowMs
    message: {
      success: false,
      message: 'Too many login attempts from this IP, please try again after 15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Login
router.post('/api/users/login', authLimiter, async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    try {

        if (user) {
            let confirmation = await bcrypt.compare(req.body.password, user.password);

            if (confirmation) {
                return res.status(200).json({
                    success: true, user:
                    {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                res.status(401).json({ success: false, message: 'Incorrect Password' })
            } return

        } else {
            return res.status(400).json({ success: false, message: 'User Not Found!' });
        }

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });

    }
});

// Create a new user - post method
router.post('/api/users', authLimiter, async (req, res) => {
    const EmailTaken = await User.findOne({ email: req.body.email });

    if (EmailTaken) {
        return res.status(400).json({ message: 'Email already taken' });
    } else {
        const user = await User.create(req.body);
        return res.status(201).json({ success: true, user });
    }

});

// Create ( Editor... )
router.post('/api/users/admin/create', authLimiter, async (req, res) => {
    try {
        // Check if req.body exists
        if (!req.body) {
            return res.status(400).json({ 
                success: false, 
                message: 'Request body is missing or invalid' 
            });
        }

        console.log('req.body:', req.body);

        // username Taken lets check it if is true
        const username = await Admin.findOne({ username: req.body.username })

         
        
        // Check if username exists in req.body
        if (!req.body.username) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username is required' 
            });
        }

        const usernameTaken = await Admin.findOne({ username: req.body.username });
        
        if (usernameTaken) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username already taken' 
            });
        } else {
            const user = await Admin.create(req.body);
            const token = await createToken(user._id); // Explicitly convert to string
            console.log('user:', user, token);

            return res.status(201).json({ 
                success: true, 
                token: token,
                admin: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        }
    } catch (error) {
        console.error('Error creating admin:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal server error: ' + error.message 
        });
    }
});

// Login Editor, confirmateur...
router.post('/api/users/admin/login', authLimiter, async (req, res) => {
    const user = await Admin.findOne({ username: req.body.username });

    try {

        if (user) {
            let confirmation = await bcrypt.compare(req.body.password, user.password);

            if (confirmation) {
                const token = await createToken(user._id); // Explicitly convert to string
                return res.status(200).json({
                    success: true, token, user:
                    {
                        id: user._id,
                        username: user.username,
                        role: user.role
                    }
                })
            } else {
                res.status(401).json({ success: false, message: 'Incorrect Password' })
            } return

        } else {
            return res.status(400).json({ success: false, message: 'User Not Found!' });
        }

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });

    }
});

// get Admins Users
router.get('/api/users/admin', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({ success: true, admins });
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Next Task: is to create a route to get a single admin user by ID, 
// and also implement a route to update an admin user's details. Additionally, 
// we should consider adding a route to delete an admin user if necessary.
// Create RBAC ( Role-Based Access Control ) for admin users, allowing different levels of access based on their roles (e.g., administrator, editor, Confirmateur).

router.get('/api/users/admin/:id', async ( req, res ) => {
    
    try {
        const admin = await Admin.findById(req.params.id);
        res.status(200).json({ success: true, admin })

    } catch ( error ) {
        res.status(500).json({ success: false, error: error, message: 'Error on fetching Admin data' });
    }

} )

// Admin Login
router.post('/api/users/admin', authLimiter, async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token, user: { email, role: "admin" } })
        } else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
})


// Get all Users
router.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});


module.exports = router;

// Get User by ID
// router.get('/api/users/:id', async (req, res) => {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
// });

