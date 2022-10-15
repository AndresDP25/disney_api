import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import { Success } from "../handlers/successHandler.js";
import { loginService, registerService } from "../services/authService.js";

//Crear un registro
export const register = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    res
      .status(201)
      .json(new Success(await registerService(name, password, email)));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Verificamos login
export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    res.json(new Success(await loginService(email, password)));
  } catch (error) {
    res.json({ message: error.message });
  }
};
