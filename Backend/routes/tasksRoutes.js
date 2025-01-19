const express = require('express');
const tokenAuth = require('../middleware/tokenAuthMiddleware');
const { getAllTasks, addTask } = require('../controllers/getDetailsController');
const router = express.Router();

// Get all tasks
router.get('/', tokenAuth, getAllTasks);
// router.get('/', getAllTasks);

// Add a task
router.post('/', tokenAuth, addTask);
// router.post('/', addTask);

module.exports = router;