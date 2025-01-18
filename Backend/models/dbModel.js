require('dotenv').config();
const mongoose = require('mongoose');

const mongo_url = '' + process.env.MONGO_CONN;

// console.log('MONGO_URI:', mongo_url); // Verify the environment variable

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
