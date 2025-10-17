const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.cookies.authorization;

  if (!token) {
    return res.status(401).json({success: false});
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({success: false});
    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
