const {
  readAllGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre.controller");

const genreRouter = require("express").Router();

genreRouter.get("/", readAllGenre);
genreRouter.post("/", createGenre);
genreRouter.patch("/:id", updateGenre);
genreRouter.delete("/:id", deleteGenre);

module.exports = genreRouter;
