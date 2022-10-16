import { check } from "express-validator";
import { AppError } from "../../errors/appError.js";
import moviesModel from "../../models/movies.js";
import { validResult } from "../commons.js";
import { validJWT } from "../auth/auth.js";

const _idExist = check("id").custom(async (id = "") => {
  const cFound = await movieService.findById(id);
  if (!cFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _creationDateIsDateAndOptional = check("creationDate")
  .optional()
  .isDate();
const _creationDateRequired = check("creationDate").not().isEmpty();
const _creationDateIsDate = check("creationDate").isDate();

const _titleOptional = check("title").optional();
const _titleRequired = check("title", "Title required").not().isEmpty();
const _titleNotExist = check("title").custom(async (title = "") => {
  const mFound = await movieService.findByTitle(title);
  if (mFound) {
    throw new AppError("The title exist in DB", 400);
  }
});

const _calificationIsNumericAndOptional = check("calification")
  .optional()
  .isNumeric();
const _calificationRequired = check("calification").not().isEmpty();
const _calificationIsNumeric = check("calification").isNumeric();

const _contentTypeExistValidation = async (contentType = "") => {
  const contentTypeFound = await contentTypeRepository.findByDescription(
    contentType
  );
  if (!contentTypeFound) {
    throw new AppError("The content type does not exist in DB", 400);
  }
};

const _genderTypeExistValidation = async (genderType = "") => {
  const genderTypeFound = await genderTypeRepository.findByDescription(
    genderType
  );
  if (!genderTypeFound) {
    throw new AppError("The gender type does not exist in DB", 400);
  }
};

const _contentTypeExist = check("contentType").custom(
  _contentTypeExistValidation
);
const _genderTypeExist = check("genderType").custom(_genderTypeExistValidation);
const _contentTypeExistAndOptional = check("contentType")
  .optional()
  .custom(_contentTypeExistValidation);
const _genderTypeExistAndOptional = check("genderType")
  .optional()
  .custom(_genderTypeExistValidation);

const _idRequired = (name) => {
  return check(name).not().isEmpty();
};
const _idIsNumeric = (name) => {
  return check(name).isNumeric();
};
const _idCharacterExist = check("idCharacter").custom(
  async (idCharacter = "", { req }) => {
    const cFound = await characterService.findById(idCharacter);
    if (!cFound) {
      throw new AppError("The character id does not exist in DB", 400);
    }
    req.character = cFound;
  }
);

const _idMovieExist = check("idMovie").custom(async (idMovie = "", { req }) => {
  const mFound = await movieService.findById(idMovie);
  if (!mFound) {
    throw new AppError("The movie id does not exist in DB", 400);
  }
  req.movie = mFound;
});

export const postRequestValidations = [
  validJWT,
  _titleRequired,
  _titleNotExist,
  _creationDateRequired,
  _creationDateIsDate,
  _calificationRequired,
  _calificationIsNumeric,
  _contentTypeExist,
  _genderTypeExist,
  validResult,
];

export const putRequestValidations = [
  validJWT,
  _idRequired("id"),
  _idIsNumeric("id"),
  _idExist,
  _titleOptional,
  _titleNotExist,
  _creationDateIsDateAndOptional,
  _calificationIsNumericAndOptional,
  _contentTypeExistAndOptional,
  _genderTypeExistAndOptional,
  validResult,
];

export const deleteRequestValidations = [
  validJWT,
  // _idRequired("id"),
  // _idIsNumeric("id"),
  _idExist,
  validResult,
];

export const getAllRequestValidation = [validJWT];

export const getRequestValidation = [
  validJWT,
  // _idRequired("id"),
  // _idIsNumeric("id"),
  _idExist,
  validResult,
];
