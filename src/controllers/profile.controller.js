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
const argon2 = require("argon2");

const cloudinary = require("cloudinary").v2;

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
        results: results.rows,
      });
    });
  });
};

exports.readProfile = (req, res) => {
  readUser(req.userData.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }

    return res.status(200).json({
      success: true,
      results: results.rows[0],
    });
  });
};

exports.updateProfile = (req, res) => {
  // if (req.file) {
  //   req.body.picture = req.file.path;
  //   readUser(req.userData.id, async (error, results) => {
  //     if (error) {
  //       return errorHandler(error, res);
  //     }
  //     if (results.rows.length) {
  //       const [user] = results.rows;
  //       if (user.picture) {
  //         const fileName = user.picture.split("/").pop()?.split(".")[0];
  //         const cek = await cloudinary.uploader.destroy(`TiketKu/${fileName}`);
  //       }
  //     }
  //     // fm.ensureFile(
  //     //   require("path").join(process.cwd(), "uploads", user.picture),
  //     //   (error) => {
  //     //     if (error) {
  //     //       return errorHandler(error, res);
  //     //     }
  //     //     fs.rm(
  //     //       require("path").join(process.cwd(), "uploads", user.picture),
  //     //       (error) => {
  //     //         if (error) {
  //     //           return errorHandler(error, res);
  //     //         }
  //     //       }
  //     //     );
  //     //   }
  //     // );
  //   });
  // }
  if (req.file) {
    req.body.picture = req.file.path;
    readUser(req.userData.id, async (error, results) => {
      if (error) {
        return errorHandler(error, res);
      } else {
        if (results.rows.length) {
          const [user] = results.rows;
          if (user.picture) {
            const fileName = user.picture.split("/").pop()?.split(".")[0];
            console.log(fileName);
            const cek = await cloudinary.uploader.destroy(
              `TiketKu/${fileName}`
            );
            console.log(cek);
          }
        }
      }
    });
  }
  updateUser(req.body, req.userData.id, (error, results) => {
    if (error) {
      return errorHandler(error, res);
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      results: results.rows[0],
    });
  });
};
