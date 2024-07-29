const Project = require('../models/Projects');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Project-related functions
exports.createProject = async (req, res) => {
  try {
    const { projectTitle, description, projectType, supervisor, program, groupMembers, proposalUrl } = req.body;

    const newProject = new Project({
      projectTitle,
      description,
      projectType,
      supervisor,
      program,
      groupMembers: groupMembers ? groupMembers.split(',').map(member => member.trim()) : [],
      proposalUrl,
      student: req.user._id
    });

    await newProject.save();

    // Update the user's assigned projects
    const student = await User.findById(req.user._id);
    if (!student.assignedProjects) {
      student.assignedProjects = []; // Initialize if not existing
    }
    student.assignedProjects.push(newProject._id);
    await student.save();

    // Update the group members' assigned projects only if group members are provided
    if (groupMembers) {
      const groupMembersArray = groupMembers.split(',').map(member => member.trim());
      await User.updateMany(
        { username: { $in: groupMembersArray } },
        { $push: { assignedProjects: newProject._id } }
      );
    }

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

exports.acceptProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('supervisor', 'profile.fullName');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.status = 'accepted';
    await project.save();

    const groupMembersArray = project.groupMembers;
    await User.updateMany(
      { username: { $in: groupMembersArray } },
      { $push: { assignedProjects: project._id } }
    );

    res.json({ message: 'Project accepted successfully', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rejectProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.status = 'rejected';
    await project.save();

    res.json({ message: 'Project rejected successfully', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupervisorProjects = async (req, res) => {
  try {
    const supervisorId = req.user.id;

    const projects = await Project.find({ supervisor: supervisorId })
      .populate({
        path: 'student',
        select: 'username profile.fullName profile.regNo'
      })
      .populate({
        path: 'supervisor',
        select: 'profile.fullName'
      })
      .sort({ status: 'asc' }); // Sort by status to bring accepted projects to the top

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentProjects = async (req, res) => {
  try {
    const studentId = req.user.id;

    const projects = await Project.find({
      $or: [
        { student: studentId },
        { groupMembers: { $in: [req.user.username] } }
      ]
    })
      .populate({
        path: 'supervisor',
        select: 'profile.fullName'
      })
      .populate({
        path: 'student',
        select: 'username'
      })
      .sort({ status: 'asc' });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectRequests = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'pending' })
      .populate({
        path: 'student',
        select: 'username profile.fullName profile.regNo'
      })
      .populate({
        path: 'supervisor',
        select: 'profile.fullName'
      });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpecificProjectRequest = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate({
        path: 'student',
        select: 'username profile.fullName profile.regNo'
      })
      .populate({
        path: 'supervisor',
        select: 'profile.fullName'
      });

    if (!project) {
      return res.status(404).json({ message: 'Project request not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Comment-related functions
exports.createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { projectId } = req.params;
    const userId = req.user._id;

    const newComment = new Comment({
      projectId,
      userId,
      comment
    });

    await newComment.save();

    const populatedComment = await newComment.populate('userId', 'profile.fullName role').execPopulate();

    res.status(201).json({ message: 'Comment added successfully', comment: populatedComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

exports.getCommentsByProjectId = async (req, res) => {
  try {
    const comments = await Comment.find({ projectId: req.params.projectId }).populate('userId', 'profile.fullName role');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('supervisor', 'profile.fullName');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
