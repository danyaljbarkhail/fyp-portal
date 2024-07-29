const User = require('../models/User');

// Get all supervisors
const getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await User.find({ role: 'supervisor' });
    res.json(supervisors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a supervisor by ID
const getSupervisorById = async (req, res) => {
  try {
    const supervisor = await User.find(req.params.id);
    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }
    res.json(supervisor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new supervisor
const createSupervisor = async (req, res) => {
  const { fullName, regNo, email, phoneNo, designation, interestedArea, projectType, program, levelOfStudies } = req.body;

  try {
    const newUser = new User({
      profile: {
        fullName,
        regNo,
        email,
        phoneNo,
        designation,
        interestedArea,
        projectType,
        program,
        levelOfStudies
      },
      role: 'supervisor'
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update supervisor profile
const updateSupervisorProfile = async (req, res) => {
  const { fullName, regNo, email, phoneNo, designation, interestedArea, projectType, program, levelOfStudies } = req.body;

  try {
    const supervisor = await User.findByIdAndUpdate(req.params.id);

    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    // Update supervisor profile details
    supervisor.profile.fullName = fullName || supervisor.profile.fullName;
    supervisor.profile.regNo = regNo || supervisor.profile.regNo;
    supervisor.profile.email = email || supervisor.profile.email;
    supervisor.profile.phoneNo = phoneNo || supervisor.profile.phoneNo;
    supervisor.profile.designation = designation || supervisor.profile.designation;
    supervisor.profile.interestedArea = interestedArea || supervisor.profile.interestedArea;
    supervisor.profile.projectType = projectType || supervisor.profile.projectType;
    supervisor.profile.program = program || supervisor.profile.program;
    supervisor.profile.levelOfStudies = levelOfStudies || supervisor.profile.levelOfStudies;

    await supervisor.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a supervisor
const deleteSupervisor = async (req, res) => {
  try {
    const supervisor = await User.findByIdAndDelete(req.params.id);

    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }

    res.json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get profile of the logged-in supervisor
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: user.profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile of the logged-in supervisor
const updateProfile = async (req, res) => {
  const updatedProfile = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profile: updatedProfile } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user: user.profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSupervisors,
  getSupervisorById,
  createSupervisor,
  updateSupervisorProfile,
  deleteSupervisor,
  getProfile,
  updateProfile
};
