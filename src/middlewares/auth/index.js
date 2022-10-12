import { check } from "express-validator";
import { validationResult } from "../commons.js";
import { validToken, validRole } from "../../services/authService.js";

const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _passwordRequired = check("password", "Password required")
  .not()
  .isEmpty();

const postLoginRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validationResult,
];
const postRegisterRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validationResult,
];

const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await validToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      validRole(req.user, ...roles);
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  postLoginRequestValidations,
  postRegisterRequestValidations,
  validJWT,
  hasRole,
};
