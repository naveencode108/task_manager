import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) return res.json({ success: false, message: "Access denied!!You don't have token" });
    
    token=token.replace('Bearer', '').trim();

    let { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id
    next();
}