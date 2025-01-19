const Task = require('../models/taskModel');
const Employee = require('../models/employeeModel');

// Get all employees (protected route)
// router.get('/allUsers', tokenAuth, getAllEmployees);
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select('-password'); // Exclude password field
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ employeeId: req.employee.id }).sort({ date: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const addTask = async (req, res) => {
    const { title, description, timeSpent, priority, reference, category } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            timeSpent,
            priority,
            reference,
            category,
            employeeId: req.employee.id
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getAllEmployees,
    getAllTasks,
    addTask
};