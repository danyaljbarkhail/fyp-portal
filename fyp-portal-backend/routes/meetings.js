const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { createMeeting, getMeetings } = require('../Controllers/meetingController');

router.post('/', protect, authorize('supervisor'), createMeeting);
router.get('/:projectId', protect, authorize('student', 'supervisor'), getMeetings);

module.exports = router;
