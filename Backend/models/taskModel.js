const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeSpent: {
        type: Number,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    reference: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const taskModel = mongoose.model('Task', TaskSchema);
module.exports = taskModel;