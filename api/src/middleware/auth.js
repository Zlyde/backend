const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({ error: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.json({ error: "Invalid token" });
    }

    req.user = { email: decoded.email };
    next();
  });
};

module.exports = {
  checkToken,
};
