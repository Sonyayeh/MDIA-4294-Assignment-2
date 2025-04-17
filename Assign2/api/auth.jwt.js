const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// this is the middleware that will authenticate the token and validate it
const authenticateToken = (req, res, next) => {

    // this pulls the Authorization header out of the headers
    const authHeader = req.headers["authorization"];

    // then it will get the token from it
    const token = authHeader && authHeader.split(" ")[1];

    // it will send an error if no token
    if(!token) {
        return res.status(401).json({ message: "Access Denied" })
    }

    // and this line means that it will varify the token using the secret
    jwt.verify(token, JWT_SECRET, (err, userData) => {

        // Error message, only appears when the token did not validate
        if(err) {
            return res.status(403).json({ message: "Invalid or expired token" })
        }

        // Success and move one with the attached user data
        req.user = userData;
        next();

    })

}

module.exports = authenticateToken;
