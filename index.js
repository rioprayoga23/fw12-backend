const express = require("express");

const app = express();
const port = 8888;

app.use("/", require("./src/routes"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hallo Ini be",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
