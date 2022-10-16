import { check } from "express-validator";
import usersModle from "../../models/usersModel.js";
import { validResult } from "../commons.js";
import { validToken } from "../../services/authService.js";

const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _passwordRequired = check("password", "Password required")
  .not()
  .isEmpty();

export const postLoginRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validResult,
];

export const postRegisterRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validResult,
];

export const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await validToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
