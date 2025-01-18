const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {

        return res.status(401)
            .json({
                msg: 'No token, authorization denied'
            });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = decoded.employee;
        next();
    } catch (err) {
        res.status(401)
            .json({
                msg: 'Token is not valid'
            });
    }
};
// 401 and 403 are HTTP status codes that indicate a request was unsuccessful.
// A 401 error means the request lacked valid authentication credentials,
// while a 403 error means the request had valid credentials
// but the user didn't have permission to access the resource. 