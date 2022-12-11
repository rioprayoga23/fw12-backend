const express = require("express");
const cors = require("cors");

const app = express();
const port = 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/uploads", express.static("uploads/"));

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

module.exports = app;
