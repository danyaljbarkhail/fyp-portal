const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'https://fyp-portal-client.vercel.app', // Adjust the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = 'mongodb+srv://danyaljk7:eL9wg8FlXK1x2WlC@fyp-portal.cq6coxu.mongodb.net/?retryWrites=true&w=majority&appName=fyp-portal'; // Replace with your actual MongoDB connection string

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// JWT Secret
const JWT_SECRET = 'd20dd387927d93890e6f90d2c0bdc7b168b8897b39a3a637998c18c9f763e11e9800c25a70b76469714964d6ced0a0b976ab3842a01b81cc0ba12a534520a69b'; // Replace with your actual JWT secret

// Routes
const authRoutes = require('./routes/auth');
const supervisorRoutes = require('./routes/supervisors');
const projectRoutes = require('./routes/projectRoutes');
const meetingRoutes = require('./routes/meetings');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', (req, res, next) => {
  req.JWT_SECRET = JWT_SECRET;
  next();
}, authRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Error handler:', err.stack);
  res.status(500).send('Something broke!');
});

app.get("/", (req, res) => {
  res.json("Hello");
});

module.exports = app;
