
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Please login." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {

    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = isAuthenticated;
