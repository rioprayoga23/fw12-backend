exports.readAllUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "List data of users",
  });
};

exports.readUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Detail User ${req.params.id}`,
  });
};

exports.createUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Add user successfully",
  });
};

exports.updateUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User update successfully",
  });
};

exports.deleteUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Delete user successfully",
  });
};
