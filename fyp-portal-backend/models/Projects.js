const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  proposalUrl: {
    type: String
  },
  projectType: {
    type: String,
    required: true
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  program: {
    type: String,
    required: true
  },
  groupMembers: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
