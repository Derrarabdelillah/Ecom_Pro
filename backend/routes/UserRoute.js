const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createToken = async (id) => {
    return  
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
router.post('/api/users',  async (req, res) => {
    const EmailTaken = await User.findOne({email: req.body.email});

    if ( EmailTaken ) {
        res.status(400).json({ message: 'Email already taken'}); 
    } else {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }

});

// Login
router.post('/api/users/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if ( user ) {
        let confirmation = await bcrypt.compare(req.body.password, user.password);

        if ( confirmation ) {
            res.status(200).json({success: true, user})
        } else {
            res.status(401).json({success: false, message: 'Incorrect Password'})
        }

    } else {
        res.status(400).json({success: false, message: 'User Not Found!'});
    }
})


module.exports = router;