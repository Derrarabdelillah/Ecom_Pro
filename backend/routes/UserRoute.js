const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SecretKey = "3#3#3#3"

const createToken = async (id) => {
    return jwt.sign({ id }, SecretKey)
}

// Get all Users
router.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Get User by ID
router.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
});

// Create a new user - post method
router.post('/api/users', async (req, res) => {
    const EmailTaken = await User.findOne({ email: req.body.email });

    if (EmailTaken) {
        return res.status(400).json({ message: 'Email already taken' });
    } else {
        const user = await User.create(req.body);
        return res.status(201).json(user);
    }

});

// Login
router.post('/api/users/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    try {

        if (user) {
            let confirmation = await bcrypt.compare(req.body.password, user.password);

            if (confirmation) {
                const token = await createToken(user._id);
                return res.status(200).json({
                    success: true, token, user:
                    {
                        id: user._id,
                        username: user.username,
                        password: user.password,
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

// Admin Login
router.post('/api/users/admin', async (req, res) => {
    try {
        const email =  req.body.email;
        const password = req.body.password;
        if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
            const token = jwt.sign({email,password}, SecretKey);
            res.json({success: true, token})
        } else {
            res.json({success: false, message: 'Invalid Credentials'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
})


module.exports = router;
// module.exports = SecretKey;