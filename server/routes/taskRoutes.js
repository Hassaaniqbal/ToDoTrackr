// routes/taskRoutes.js
const express = require('express');
const { getAllTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes below this point
router.use(protect);

// Route to get all tasks for the logged-in user
router.get('/', getAllTasks);

// Route to add a new task
router.post('/add', addTask);

// Route to update a task (mark it complete or edit it)
router.patch('/:id', updateTask);

// Route to delete a task
router.delete('/:id', deleteTask);

module.exports = router;
