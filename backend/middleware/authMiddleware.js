const jwt = require('jsonwebtoken');

// Middleware to protect routes
exports.protect = (req, res, next) => {
  let token = req.headers.authorization;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token or invalid format' });
  }

  token = token.split(' ')[1]; // Extract token from 'Bearer <token>'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request
    next();
  } catch (error) {
    // Log error (optional)
    console.error('JWT verification error:', error);
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
