const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// JWT secret key (make sure to use environment variables in production)
const JWT_SECRET = 'your_secret_key';

// User registration endpoint
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user
        const newUser = new User({ username, password });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

        // Return token as response
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// User login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        // Return token as response
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

module.exports = router;
