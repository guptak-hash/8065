const bcrypt = require('bcryptjs');
const Employee = require('../models/employeeModel');


const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400)
                .json({
                    msg: 'User already exists',
                    success: false
                });

        }
        employee = new Employee({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
        await employee.save();

        res.status(201)
            .json({
                msg: 'User registered successfully',
                success: true
            });
    } catch (err) {
        console.error(err.message);
        res.status(500)
            .json({
                msg: 'Internal server error',
                success: false
            });
    }
}
module.exports = register;