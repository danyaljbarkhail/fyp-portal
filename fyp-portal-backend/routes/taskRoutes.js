const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../Controllers/taskController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('supervisor'), createTask);
router.get('/:projectId', protect, authorize('student', 'supervisor'), getTasks);

module.exports = router;
