import { check } from "express-validator";
import usersModle from "../../models/usersModel.js";
import { validResult } from "../commons.js";
//todo validJWT

const _nameRequired = check("name", "Name required").not().isEmpty();
const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _emailExist = check("email").custom(async (email = "") => {
  const userFound = await usersModle.findOne({ where: { email } });
  if (userFound) {
    throw new AppError("Email already exist in DB", 400);
  }
});

const _optionalEmailValid = check("email", "Email is invalid")
  .optional()
  .isEmail();
const _optionalEmailExist = check("email")
  .optional()
  .custom(async (email = "") => {
    const userFound = await usersModle.findOne(email);
    if (userFound) {
      throw new Error("Email already exist in DB", 400);
    }
  });
const _passwordRequired = check("password", "Password required")
  .not()
  .isEmpty();

const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new Error("Invalid Role", 400);
    }
  });

const _idRequied = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(async (id = "") => {
  const userFound = await usersModle.findOne(id);
  if (!userFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

export const postRequestValidations = [
  // validJWT,
  _nameRequired,
  _emailRequired,
  _emailValid,
  _emailExist,
  _passwordRequired,
  _roleValid,
  // validResult,
];

export const putRequestValidations = [
  // validJWT,
  _idRequied,
  // _idIsNumeric,
  // _idExist,
  _optionalEmailValid,
  _optionalEmailExist,
  // _roleValid,
  // validResult,
];

export const deleteRequestValidations = [
  // validJWT,
  _idRequied,
  // _idIsNumeric,
  // _idExist,
  validResult,
];

export const getAllRequestValidation = [validResult];

export const getRequestValidation = [
  // validJWT,
  _idRequied,
  // _idIsNumeric,
  // _idExist,
  validResult,
];
