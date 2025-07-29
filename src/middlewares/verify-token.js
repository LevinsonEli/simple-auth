import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export default function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded; // attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
