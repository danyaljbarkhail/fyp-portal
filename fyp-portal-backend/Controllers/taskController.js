const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, assignedTo, dueDate, projectId } = req.body;

    const task = new Task({
      title,
      assignedTo,
      dueDate,
      project: projectId
    });

    await task.save();

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.find({ project: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

module.exports = { createTask, getTasks };
