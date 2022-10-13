import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/usersController.js";
import { postRequestValidations } from "../middlewares/users/users.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", postRequestValidations, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
