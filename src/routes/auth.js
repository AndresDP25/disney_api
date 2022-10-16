import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import {
  postRegisterRequestValidations,
  postLoginRequestValidations,
} from "../middlewares/auth/auth.js";

const router = Router();

router.post("/register", postRegisterRequestValidations, register);
router.post("/login", postLoginRequestValidations, login);

export default router;
