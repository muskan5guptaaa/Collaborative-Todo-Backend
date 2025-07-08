const Task = require('../models/Task');
const User = require('../models/User');
const { logAction } = require('../utils/logger');

// Create Task
const COLUMN_NAMES = ['Todo', 'In Progress', 'Done'];

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;

    // 1. Prevent titles matching column names (case-insensitive)
    if (COLUMN_NAMES.some(col => col.toLowerCase() === title.trim().toLowerCase())) {
      return res.status(400).json({ message: 'Task title cannot match column names (Todo, In Progress, Done).' });
    }

    // 2. Ensure title is unique (case-insensitive)
    const existing = await Task.findOne({ title: { $regex: `^${title}$`, $options: 'i' } });
    if (existing) {
      return res.status(400).json({ message: 'Task title must be unique.' });
    }

    const task = await Task.create(req.body);

    // Log the action
    logAction(req.user._id, 'created task', task._id);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate('assignedTo', 'name');
  res.json(tasks);
};

// Update Task
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  logAction(req.user._id, 'updated task', task._id);
  res.json(task);
};

// Delete Task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  logAction(req.user._id, 'deleted task', req.params.id);
  res.json({ message: 'Task removed' });
};

// Smart Assign
exports.smartAssign = async (req, res) => {
  const users = await User.find();
  let minUser = null, minCount = Infinity;

  for (let user of users) {
    const count = await Task.countDocuments({ assignedTo: user._id, status: { $ne: 'Done' } });
    if (count < minCount) {
      minCount = count;
      minUser = user;
    }
  }

  const task = await Task.findByIdAndUpdate(req.params.id, { assignedTo: minUser._id }, { new: true });
  logAction(req.user._id, 'smart assigned task', task._id);
  res.json(task);
};
