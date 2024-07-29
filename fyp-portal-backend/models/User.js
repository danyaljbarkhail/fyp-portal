const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const profileSchema = new mongoose.Schema({
  fullName: String,
  batchNo: String,
  email: String,
  phoneNo: String,
  regNo: String,
  section: String,
  program: {
    type: String,
    enum: ['Bsc', 'Msc', 'Phd']
  },
  batchStream: {
    type: String,
    enum: ['Computer Science', 'Data Science']
  },
  designation: String,
  interestedArea: String,
  projectType: String,
  levelOfStudies: String,
  // Add any other fields needed for both student and supervisor
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profile: profileSchema,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
