const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const SECRET_KEY = process.env.SECRET_KEY;
console.log(token);
  console.log(SECRET_KEY);
  if (!token) {
    console.log("token unavailable");
    return res.status(401).json({ message: "Token required" })};
  console.log(token);
  console.log(SECRET_KEY);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    console.log("secret key verified");
    req.user = user;
    next();
  });
}
module.exports = authenticateToken;
