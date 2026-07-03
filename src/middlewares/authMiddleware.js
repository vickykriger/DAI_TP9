import jwt from 'jsonwebtoken';
import LogHelper from '../helpers/LogHelper';
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Acceso denegado. Token no provisto o formato inválido." });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        LogHelper.logError(error);
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};