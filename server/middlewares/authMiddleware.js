const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    req.user = { role: 'admin' };
    next();
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Pristup zabranjen' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };