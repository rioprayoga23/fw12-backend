const { readUserByEmail, createUser } = require("../models/users.model");
const { errorHandler } = require("../helpers/errorHandler.helper");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  readUserByEmail(req.body.email, (error, results) => {
    if (results.rows.length > 0) {
      const [user] = results.rows;
      if (user.password === req.body.password) {
        const token = jwt.sign({ id: user.id }, "backend-secret");
        return res.status(200).json({
          success: true,
          message: "Login success",
          data: {
            token: token,
          },
        });
      }
      return res.status(401).json({
        success: true,
        message: "Email or Password Invalid",
      });
    }
  });
};

exports.register = (req, res) => {
  createUser(req.body, (error, results) => {
    if (error) {
      errorHandler(error, res);
    } else {
      return res.status(200).json({
        success: true,
        message: "Register Success",
        data: results.rows[0],
      });
    }
  });
};
