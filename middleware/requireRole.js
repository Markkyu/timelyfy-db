function requireRole(requiredRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role; // decoded from JWT or session
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

module.exports = requireRole;
