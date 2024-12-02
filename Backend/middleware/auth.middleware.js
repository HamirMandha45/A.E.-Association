import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, token missing", success: false });
    }

    jwt.verify(token, process.env.JWT_SECRETE, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired", success: false });
            }
            return res.status(403).json({ message: "Forbidden, invalid token", success: false });
        }
        req._id = decoded._id;  // Attach userId from token to the request
        next();  // Move to the next middleware or route handler
    });
}

export{
    authenticateToken
}