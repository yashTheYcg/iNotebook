const jwt = require("jsonwebtoken");
const JWT_secret = 'yashissogoodb@oy';

const fetchUser = (req,res,next) => {
    // Get the userfrom the jwt token and add id to req object
    const token = req.header('auth-token');
    
    try {
        const data = jwt.verify(token,JWT_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports = fetchUser;