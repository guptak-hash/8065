const express = require('express');
const tokenAuth = require('../middleware/tokenAuthMiddleware');
const { getAllTasks, addTask } = require('../controllers/getDetailsController');
const router = express.Router();

// Get all tasks
router.get('/', tokenAuth, getAllTasks);

// Add a task
router.post('/', tokenAuth, addTask);

module.exports = router;