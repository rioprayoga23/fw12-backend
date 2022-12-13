const { validationResult } = require("express-validator");

const {
  readUserByEmail,
  createUser,
  updateUser,
} = require("../models/users.model");

const { errorHandler } = require("../helpers/errorHandler.helper");

const jwt = require("jsonwebtoken");

const {
  createForgotPassword,
  readForgotPasswordByEmailAndCode,
  deleteForgotPassword,
} = require("../models/forgotPassword.model");

exports.login = (req, res) => {
  readUserByEmail(req.body.email, (error, results) => {
    if (results.rows.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }
    if (results.rows.length > 0) {
      const [user] = results.rows;
      if (user.password === req.body.password) {
        const token = jwt.sign({ id: user.id }, "backend-secret");
        return res.status(200).json({
          success: true,
          message: "Login success",
          results: {
            token: token,
          },
        });
      }
      return res.status(401).json({
        success: false,
        message: "Email or Password Invalid",
      });
    }
  });
};

exports.register = (req, res) => {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errorValidation
        .array()
        .map((e) => e.msg)
        .toString(),
    });
  }
  createUser(req.body, (error, results) => {
    if (error) {
      errorHandler(error, res);
    } else {
      const [user] = results.rows;
      const token = jwt.sign({ id: user.id }, "backend-secret");

      return res.status(200).json({
        success: true,
        message: "Register Success",
        results: { token },
      });
    }
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  console.log(email);
  readUserByEmail(email, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    if (results.rows.length > 0) {
      const [user] = results.rows;
      const data = {
        email: email,
        userId: user.id,
        code: Math.ceil(Math.random() * 90000),
      };
      createForgotPassword(data, (error, results) => {
        if (results.rows.length > 0) {
          return res.status(200).json({
            success: true,
            message: "Reset password has been requested",
          });
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
  });
};

exports.resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    readForgotPasswordByEmailAndCode(req.body, (error, results) => {
      if (error) {
        errorHandler(error, res);
      }
      if (results.rows.length > 0) {
        const [resetReq] = results.rows;
        if (
          new Date(resetReq.createdAt).getTime() + 60 * 1000 * 3 <
          new Date().getTime()
        ) {
          return res.status(400).json({
            success: false,
            message: "Code is expired",
          });
        }
        updateUser(req.body, resetReq.userId, (error, results) => {
          if (error) {
            return errorHandler(error, res);
          }
          if (results.rows) {
            deleteForgotPassword(resetReq.id, (error, results) => {
              if (error) {
                return errorHandler(error, res);
              }
              return res.status(200).json({
                success: true,
                message: "Password updated, please relogin",
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Reset request not found",
        });
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password not match",
    });
  }
};
