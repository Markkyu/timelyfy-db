const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || "supersecretkey";

// Verify token and role
function verifyRole(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // attach user info (id, role)

      if (!allowedRoles.includes(decoded.role))
        return res
          .status(403)
          .json({ message: "Access denied: insufficient role" });

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

module.exports = { verifyRole };
