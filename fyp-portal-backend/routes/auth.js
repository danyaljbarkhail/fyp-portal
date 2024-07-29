const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const { getProfile, updateProfile } = require('../Controllers/profileController');
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  console.log('Registering user:', username, role);

  try {
    const user = new User({ username, password, role });
    console.log('Saving user to database');
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, req.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
    console.log('User registered successfully:', username);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route to login
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  console.log('Logging in user:', username, role);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== role) {
      console.log('Role does not match');
      return res.status(403).json({ message: 'Role does not match' });
    }

    // Generate JWT token with user id and role
    const token = jwt.sign({ id: user._id, role: user.role }, req.JWT_SECRET, { expiresIn: '1d' });

    // Return token as JSON response
    res.json({ token });
    console.log('User logged in successfully:', username);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to verify token
router.post('/verify', async (req, res) => {
  const { token } = req.body;

  console.log('Verifying token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, req.JWT_SECRET);

    // Fetch user details based on decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Token is valid, return user details
    res.json({ user });
    console.log('Token verified successfully:', decoded.id);
  } catch (error) {
    // Token verification failed
    console.error('Token verification failed:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Token verification failed' });
  }
});

// Route to get user profile
router.get('/profile', protect, getProfile);

// Route to update user profile (only accessible to student or supervisor)
router.put('/profile', protect, authorize('student', 'supervisor'), updateProfile);

module.exports = router;
