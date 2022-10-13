import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "../controllers/moviesController.js";

const router = Router();

router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
