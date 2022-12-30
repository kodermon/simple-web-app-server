const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authUser = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ msg: "Authentication invalid" });
  }

  try {
    token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authentication invalid" });
  }
  if (!token) {
    res.status(401).json({ msg: "Not authorized, no token provided" });
  }
};

module.exports = { authUser };
