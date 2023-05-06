const jwt = require("jsonwebtoken");
require("dotenv/config");

const jwtSecret = process.env.JWT_SECRET;

const authChecker = (req, res, next) => {
    try {
      const token = req.headers["authorization"] || req.headers["x-access-token"];
      if (!token) return res.status(401).json({message: "No token provided...", success: false});
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          let error = new Error("Invalid token");
          error.statusCode = 401;
          throw error;
        }
        req.userId = decoded.userId;
        next();
      });
    } catch (err) {
      next(err);
    }
  };


module.exports = authChecker;