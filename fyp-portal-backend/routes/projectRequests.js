const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

// Create a new project
router.post('/projects', protect, authorize('student'), async (req, res) => {
  const {
    projectTitle,
    description,
    proposal,
    projectType,
    supervisor,
    program,
    groupMembers
  } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newProject = {
      projectTitle,
      description,
      proposal,
      projectType,
      supervisor,
      program,
      groupMembers: groupMembers || [] // Ensure groupMembers is initialized properly
    };

    user.projects.push(newProject);

    await user.save();
    res.status(201).json({ message: 'Project created successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all projects for the logged-in student
router.get('/projects', protect, authorize('student'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const projects = user.projects;
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
