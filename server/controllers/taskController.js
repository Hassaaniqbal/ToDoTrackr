// controllers/taskController.js
const Task = require('../models/Task');
const catchAsync = require('../utils/catchAsync');

// Get all tasks for the logged-in user
exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json(tasks);
});

// Add a new task
exports.addTask = catchAsync(async (req, res) => {
  const task = await Task.create({ user: req.user._id, description: req.body.description });
  res.status(201).json(task);
});

// Update a task (e.g., mark complete or edit description)
exports.updateTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(200).json(task);
});

// Delete a task
exports.deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(204).json({ message: 'Task deleted' });
});
