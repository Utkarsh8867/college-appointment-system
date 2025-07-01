const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).send("User not found");
    
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};


// exports.isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next(); // allow to proceed
//   } else {
//     return res.status(403).json({ msg: 'Access denied: Admins only' });
//   }
// };


// const jwt = require('jsonwebtoken');



