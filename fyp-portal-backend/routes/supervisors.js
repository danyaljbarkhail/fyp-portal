const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { 
    getAllSupervisors, 
    getSupervisorById, 
    updateSupervisorProfile, 
    createSupervisor, 
    deleteSupervisor, 
    getProfile, 
    updateProfile 
} = require('../controllers/supervisorController');

// Routes for supervisor's own profile
router.get('/profile', protect, authorize('supervisor', 'student'), getProfile);
router.put('/profile', protect, authorize('supervisor', 'student'), updateProfile);

// CRUD routes for supervisors managed by admin
router.get('/', protect, authorize('admin', 'student'), getAllSupervisors);
router.get('/:id', protect, authorize('admin', 'student'), getSupervisorById);
router.post('/', protect, authorize('admin'), createSupervisor);
router.put('/:id', protect, authorize('admin'), updateSupervisorProfile);
router.delete('/:id', protect, authorize('admin'), deleteSupervisor);

module.exports = router;
