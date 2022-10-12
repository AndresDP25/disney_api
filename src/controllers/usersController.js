import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Mostrar un registro
export const getUser = async (req, res) => {
  try {
    const user = await usersModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(user[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Crear un registro
export const createUser = async (req, res) => {
  try {
    const { username, password, name, email, enable } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await usersModel.create({
      username: username,
      hash: hash,
      name: name,
      email: email,
      enable: enable,
    });
    res.status(200).json({ message: "User created correctly" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Actualizar un registro
export const updateUser = async (req, res) => {
  try {
    usersModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "¡User update correctly",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Eliminar un registro
export const deleteUser = async (req, res) => {
  try {
    usersModel.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "User removed correctly",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
