require('dotenv').config();
const express = require('express');
require('./models/dbModel');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/tasksRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// For Login and register routes
app.use('/api/auth', authRoutes);

// For tasks routes
app.use('/api/tasks', tasksRoutes);

// Routes
app.get('/', (req, res) => res.send('API Running'));
