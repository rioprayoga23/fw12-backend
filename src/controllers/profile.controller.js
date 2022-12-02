const { errorHandler } = require("../helpers/errorHandler.helper");
const filter = require("../helpers/filter.helper");
const {
  updateUser,
  readAllUsers,
  readCountAllUsers,
  readUser,
} = require("../models/users.model");

const fs = require("fs");
const fm = require("fs-extra");

exports.readAllProfile = (req, res) => {
  const sortable = ["name", "createdAt", "updatedAt"];
  filter(req.query, sortable, readCountAllUsers, res, (filter, pageInfo) => {
    readAllUsers(filter, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      return res.status(200).json({
        success: true,
        message: "List all users",
        pageInfo,
        data: results.rows,
      });
    });
  });
};

exports.readProfile = (req, res) => {
  readUser(req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }

    return res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

exports.updateProfile = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename;
    readUser(req.params.id, (error, results) => {
      if (error) {
        return errorHandler(error, res);
      }
      if (results.rows.length) {
        const [user] = results.rows;
        fm.ensureFile(`uploads/${user.picture}`, (error) => {
          if (error) {
            return errorHandler(error, res);
          }
          fs.rm(`uploads/${user.picture}`, (error) => {
            if (error) {
              return errorHandler(error, res);
            }
          });
        });
      }
    });
  }

  updateUser(req.body, req.params.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      data: results.rows[0],
    });
  });
};
