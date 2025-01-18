const express = require('express');
const register = require('../controllers/userRegisterController');
const login = require('../controllers/userLoginController');
const getAllEmployees = require('../controllers/getDetailsController');
// const tokenAuth = require('../middleware/tokenAuthMiddleware');
const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get all employees (protected route) WITH tokenAuth
// router.get('/allUsers', tokenAuth, getAllEmployees);// some problem with this token verification

// Get all employees WITHOUT tokenAuth
router.get('/allUsers', getAllEmployees);

module.exports = router;