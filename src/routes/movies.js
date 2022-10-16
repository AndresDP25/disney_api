import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "../controllers/moviesController.js";
import {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} from "../middlewares/movies/movies.js";

const router = Router();

router.get("/", getAllRequestValidation, getAllMovies);
router.get("/:id", getRequestValidation, getMovie);
router.post("/", postRequestValidations, createMovie);
router.put("/:id", putRequestValidations, updateMovie);
router.delete("/:id", deleteRequestValidations, deleteMovie);

export default router;
