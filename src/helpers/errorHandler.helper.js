exports.errorHandler = (error, res) => {
  if (error.message.includes(' unique constraint "users_email_key"')) {
    return res.status(400).json({
      success: false,
      message: "Email already used",
    });
  }
  return res.status(500).json({
    success: false,
    message: `Something error in our backend : ${error.message}`,
  });
};
