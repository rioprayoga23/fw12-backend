const {
  readAllCinemas,
  readCinema,
  createCinema,
  updateCinema,
  deleteCinema,
} = require("../controllers/cinemas.controller");

const cinemaRouter = require("express").Router();

cinemaRouter.get("/", readAllCinemas);
cinemaRouter.get("/:id", readCinema);
cinemaRouter.post("/", createCinema);
cinemaRouter.patch("/:id", updateCinema);
cinemaRouter.delete("/:id", deleteCinema);

module.exports = cinemaRouter;
