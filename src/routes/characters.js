import { Router } from "express";
import {
  createCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacter,
  updateCharacter,
} from "../controllers/CharactersController.js";
import {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} from "../middlewares/movies/movies.js";

const router = Router();

router.get("/", getAllRequestValidation, getAllCharacters);
router.get("/:id", getRequestValidation, getCharacter);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id", putRequestValidations, updateCharacter);
router.delete("/:id", deleteRequestValidations, deleteCharacter);

export default router;
