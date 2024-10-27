const jwtKey = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            message: "Unauthorized: No token provided"
        });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, jwtKey);
        console.log(decoded);

        if (decoded) {
            req.id = decoded.id; 
            return next(); 
        } else {
            
            return res.redirect('/'); 
        }
    } catch (e) {
        console.error(e);
        return res.redirect('/'); 
    }
};

module.exports = auth;
