const { check } = require("express-validator");
import { AppError } from "../../errors/appError.js";
import charactersModel from "../../models/characters.js";
import { validResult } from "../commons.js";
// import { validJWT, hasRole } from "../auth/auth.js";

const _nameRequired = check("name", "Name required").not().isEmpty();
const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });

const _idRequied = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(async (id = "") => {
  const cFound = await charactersModel.findByPk(id, {
    include: [
      {
        model: Movie,
        as: "movies",
      },
    ],
  });
  if (!cFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _historyRequired = check("history").not().isEmpty();
const _ageIsNumeric = check("age").optional().isNumeric();
const _weigthIsNumeric = check("weigth").optional().isNumeric();
const _nameNotExist = check("name").custom(async (name = "") => {
  const cFound = await charactersModel.findOne({ where: { name } });
  if (cFound) {
    throw new AppError("The name exist in DB", 400);
  }
});

const postRequestValidations = [
  //   validJWT,
  _nameRequired,
  _nameNotExist,
  _ageIsNumeric,
  _historyRequired,
  _weigthIsNumeric,
  validResult,
];

export const putRequestValidations = [
  //   validJWT,
  _idRequied,
  _nameNotExist,
  //   _idIsNumeric,
  //   _idExist,
  _ageIsNumeric,
  _weigthIsNumeric,
  //   _roleValid,
  validResult,
];

export const deleteRequestValidations = [
  //   validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  //   _idIsNumeric,
  //   _idExist,
  validResult,
];

export const getAllRequestValidation = [validJWT];

export const getRequestValidation = [
  validJWT,
  _idRequied,
  _idIsNumeric,
  _idExist,
  validResult,
];

export const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single("image"),
  _idRequied,
  _idIsNumeric,
  _idExist,
  imageRequired,
  validResult,
];
