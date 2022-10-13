import { check } from "express-validator";

const _nameRequired = check("name", "Name required").not().isEmpty();

export const postRequestValidations = [_nameRequired];
