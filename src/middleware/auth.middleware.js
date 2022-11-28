const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.slice(7);
    try {
      const payload = jwt.verify(token, "backend-secret");
      req.userData = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorize",
    });
  }
};

module.exports = authMiddleware;
