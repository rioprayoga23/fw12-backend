exports.errorHandler = (error, res) => {
  if (error.message.includes(' unique constraint "users_email_key"')) {
    return res.status(400).json({
      success: false,
      message: "Email already used",
    });
  }
  if (error.message.includes(' unique constraint "UniqueNameStatus"')) {
    return res.status(400).json({
      success: false,
      message: "Status Name already",
    });
  }
  if (error.message.includes(' unique constraint "UniqueEmailSubscribers"')) {
    return res.status(400).json({
      success: false,
      message: "Email already used",
    });
  }
  if (error.message.includes(' unique constraint "UniqueNameGenre"')) {
    return res.status(400).json({
      success: false,
      message: "Genre already",
    });
  }
  if (error.message.includes())
    return res.status(500).json({
      success: false,
      message: `Something error in our backend : ${error.message}`,
    });
};
