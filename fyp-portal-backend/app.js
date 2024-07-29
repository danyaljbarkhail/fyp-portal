const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin:{""}, // Adjust the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = 'mongodb+srv://danyaljk7:eL9wg8FlXK1x2WlC@fyp-portal.cq6coxu.mongodb.net/?retryWrites=true&w=majority&appName=fyp-portal'; // Replace with your actual MongoDB connection string

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
//Default Api
// app.get("/", (req, res) > {
// res.json("Hello");
// });
// Routes
const authRoutes = require('./routes/auth');
const supervisorRoutes = require('./routes/supervisors');
const projectRoutes = require('./routes/projectRoutes');
const meetingRoutes = require('./routes/meetings');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
