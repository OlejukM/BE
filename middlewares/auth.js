const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// JWT secret key (make sure to use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const authenticateJWT = expressJwt({
    secret: JWT_SECRET,
    algorithms: ['HS256']
});

module.exports = {
    authenticateJWT
};