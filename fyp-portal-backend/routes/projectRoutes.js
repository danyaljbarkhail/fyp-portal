const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createProject,
  acceptProject,
  rejectProject,
  getSupervisorProjects,
  getStudentProjects,
  getProjectRequests,
  getSpecificProjectRequest,
  getProjectById,
  createComment,
  getCommentsByProjectId
} = require('../Controllers/projectController');
const messageRoutes = require('./messageRoutes');
const router = express.Router();

// Project routes
router.post('/', protect, authorize('student'), createProject);
router.get('/requests', protect, authorize('supervisor', 'student'), getProjectRequests);
router.put('/requests/:projectId/accept', protect, authorize('supervisor'), acceptProject);
router.put('/requests/:projectId/reject', protect, authorize('supervisor'), rejectProject);
router.get('/supervisor', protect, authorize('supervisor'), getSupervisorProjects);
router.get('/myprojects', protect, authorize('student'), getStudentProjects);
router.get('/requests/:id', protect, authorize('student', 'supervisor'), getSpecificProjectRequest);
router.get('/:id', protect, authorize('admin', 'supervisor', 'student'), getProjectById);

// Comment routes
router.post('/:projectId/comments', protect, authorize('admin', 'supervisor', 'student'), createComment);
router.get('/:projectId/comments', protect, authorize('admin', 'supervisor', 'student'), getCommentsByProjectId);

// Chat routes
router.use('/:projectId/messages', messageRoutes);

module.exports = router;
