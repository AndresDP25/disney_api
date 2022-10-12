import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userService from "../services/userService.js";
import AppError from "../errors/appError.js";
// import logger from "../loaders/logger";
import { AUTH_SECRET, AUTH_TTL } from "../config/config.js";

const login = async (email, password) => {
  try {
    //Validación de email
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new AppError(
        "Authentication failed! Email / password does not correct. #1",
        401
      );
    }

    //Validación de usaurio habilitado
    if (!user.enable) {
      throw new AppError("Authentication failed! User disabled.", 401);
    }

    //Validación de password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError(
        "Authentication failed! Email / password does not correct. #2",
        401
      );
    }

    //Generar JWT
    const token = _encrypt(user.id);

    return {
      token,
      user: user.name,
      role: user.role,
    };
  } catch (error) {
    throw error;
  }
};

const validToken = async (token) => {
  try {
    // validar que token venga como parametro
    if (!token) {
      throw new AppError("Authentication failed! Token required", 401);
    }

    // logger.info(`Token received: ${token}`);

    // validar que token sea integro
    let id;
    try {
      const obj = jwt.verify(token, AUTH_SECRET);
      id = obj.id;
    } catch (verifyError) {
      throw new AppError("Authentication failed! Ivalid token", 401, token);
    }

    logger.info(`User id in the token: ${id}`);

    // validar si hay usuario en bd
    const user = await userService.findById(id);
    if (!user) {
      throw new AppError(
        "Authentication failed! Invalid Token - User not found",
        401
      );
    }

    // validar si usaurio esta habilitado
    if (!user.enable) {
      throw new AppError("Authentication failed! User disabled", 401);
    }

    //retornar el usaurio
    return user;
  } catch (err) {
    throw err;
  }
};

const validRole = (user, ...roles) => {
  if (!roles.includes(user.role)) {
    throw new AppError("Authorization failed! User without privileges.", 403);
  }
  return true;
};

const register = async (email, password) => {
  const user = { email, password };

  await userService.save(user);

  //TODO: Enviar un mail de confirmación de registro.

  return "User registered. You can log in to use the API.";
};

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret, { expiresIn: AUTH_TTL });
};

export { login, register, validToken, validRole };
