const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error verifying JWT:", err);
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!decoded || !decoded.Userinfo || !decoded.Userinfo.email) {
      console.error("Invalid JWT payload:", decoded);
      return res.status(403).json({ message: "Invalid JWT payload" });
    }

    req.email = decoded.Userinfo.email;
    req.isAdmin = decoded.Userinfo.isAdmin;

    next();
  });
};

module.exports = verifyJWT;
