const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({ email });
        if (!employee) {

            return res.status(403)
                .json({
                    msg: 'Invalid credentials',
                    success: false
                });
        }
        const isPassMatch = await bcrypt.compare(password, employee.password);
        if (!isPassMatch) {
            return res.status(403)
                .json({
                    msg: 'Invalid credentials',
                    success: false
                });
        }
        const payload = {
            employee: {
                _id: employee.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = login;