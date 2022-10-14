import { validationResult, checkSchema } from "express-validator";
import { AppError } from "../errors/appError.js";

export const validResult = (req, res, next) => {
  console.log(req.params);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation Errors", 400, errors.errors);
  }
  next();
};

const imageRequired = checkSchema({
  image: {
    custom: {
      options: (value, { req }) => !!req.file,
      errorMessage: "You should upload a file",
    },
  },
});
