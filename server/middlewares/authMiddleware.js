const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Pristup odbijen. Token nije dostavljen.' });

    jwt.verify(token, process.env.JWT_SECRET || 'super_secret_crm_key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token nije validan ili je istekao.' });
        req.user = user;
        next();
    });
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