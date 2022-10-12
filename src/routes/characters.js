import { Router } from "express";
import {
  createCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacter,
  updateCharacter,
} from "../controllers/CharactersController.js";

const router = Router();

router.get("/", getAllCharacters);
router.get("/:id", getCharacter);
router.post("/", createCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;
