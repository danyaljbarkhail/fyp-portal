const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getMessages, sendMessage } = require('../Controllers/messageController');
const router = express.Router({ mergeParams: true });

router.get('/', protect, authorize('student', 'supervisor'), getMessages);
router.post('/', protect, authorize('student', 'supervisor'), sendMessage);

module.exports = router;
