const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Niste ulogovani' });

    jwt.verify(token, process.env.JWT_SECRET || 'super_secret_crm_key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Nevažeći token' });
        req.user = user;
        next();
    });
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Pristup zabranjen za vašu ulogu' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
