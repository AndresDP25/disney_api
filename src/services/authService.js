import { AppError } from "../errors/appError.js";
import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AUTH_SECRET, AUTH_TTL } from "../config/config.js";

export const loginService = async (email, password) => {
  try {
    //validacion de email
    const founduser = await usersModel.findAll({
      where: {
        email: email,
      },
    });

    if (!founduser[0]) {
      throw new AppError(
        "Authentication failed! Email / password does not correct. #1",
        401
      );
    }
    console.log(founduser[0].dataValues.enable);

    const user = founduser[0].dataValues;
    //Validación de usaurio habilitado
    if (!user.enable) {
      throw new AppError("Authentication failed! User disabled.", 401);
    }

    //validación de password
    const validPass = await bcrypt.compare(password, user.hash);
    if (!validPass) {
      throw new AppError(
        "Authentication failed! Email / password does not correct. #2",
        401
      );
    }

    //Generar JWT
    const token = encrypt(user.id);
    return { token, user: user.name, role: user.role };
  } catch (error) {
    throw error;
  }
};

const encrypt = (id) => {
  return jwt.sign({ id }, AUTH_SECRET, {
    expiresIn: AUTH_TTL,
  });
};

export const registerService = async (name, password, email) => {
  try {
    console.log(name, password, email);
    const hash = await bcrypt.hash(password, 10);
    const user = await usersModel.findAll({
      where: {
        email: email,
      },
    });

    if (user[0]) {
      return { message: "existing email" };
    } else {
      await usersModel.create({
        name: name,
        hash: hash,
        email: email,
      });
      return { message: "User created" };
    }
  } catch (error) {
    throw error;
  }
};
