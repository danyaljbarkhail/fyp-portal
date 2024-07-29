const express = require('express');
const router = express.Router();
const Project = require('../models/Projects');
const User = require('../models/User');

// Fetch all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().populate('supervisor', 'profile.fullName');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route to fetch student details
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('profile');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
});

// Route to get total projects
router.get('/total-projects', async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments({});
    res.status(200).json({ totalProjects });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total projects', error });
  }
});

// Route to get total supervisors
router.get('/total-supervisors', async (req, res) => {
  try {
    const totalSupervisors = await User.countDocuments({ role: 'supervisor' });
    res.status(200).json({ totalSupervisors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total supervisors', error });
  }
});

// Route to get total students
router.get('/total-students', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    res.status(200).json({ totalStudents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total students', error });
  }
});

// Route to get students with projects
router.get('/students-with-projects', async (req, res) => {
  try {
    const studentsWithProjects = await Project.distinct('student').then(students => students.length);
    res.status(200).json({ studentsWithProjects });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students with projects', error });
  }
});

// Add this route to delete a project
router.delete('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

// Add this route to delete a student
router.delete('/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    await User.findByIdAndDelete(studentId);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
});

// Add this route to delete a supervisor
router.delete('/supervisors/:id', async (req, res) => {
  try {
    const supervisorId = req.params.id;
    await User.findByIdAndDelete(supervisorId);
    res.status(200).json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supervisor', error });
  }
});

module.exports = router;
