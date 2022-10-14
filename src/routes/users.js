import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/usersController.js";
import {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} from "../middlewares/users/users.js";

const router = Router();

router.get("/", getAllRequestValidation, getAllUsers);
router.get("/:id", getRequestValidation, getUser);
router.post("/", postRequestValidations, createUser);
router.put("/:id", putRequestValidations, updateUser);
router.delete("/:id", deleteRequestValidations, deleteUser);
//todo deleteRequestValidations

export default router;
