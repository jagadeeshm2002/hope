const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("Expired JWT:", err);
        return res.status(401).json({ message: "TokenExpiredError: Token has expired" });
      } else {
        console.error("Error verifying JWT:", err);
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
    }

    if (!decoded || !decoded.Userinfo || !decoded.Userinfo.email) {
      console.error("Invalid JWT payload:", decoded);
      return res.status(403).json({ message: "Invalid JWT payload: Missing required fields" });
    }

    // Attach user info to the request object
    req.email = decoded.Userinfo.email;
    req.userId = decoded.Userinfo.userId; // Assuming you're passing userId in the payload

    next(); // Move to the next middleware
  });
};

module.exports = verifyJWT;
