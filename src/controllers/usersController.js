import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    if (user) {
      res.status(200).json(user[0]);
    } else {
      res.status(400).json({ message: "id not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Crear un registro
export const createUser = async (req, res) => {
  try {
    const { username, password, name, email, enable, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await usersModel.create({
      username: username,
      hash: hash,
      name: name,
      email: email,
      enable: enable,
      role: role,
    });
    res.status(200).json({ message: "User created correctly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Actualizar un registro
export const updateUser = async (req, res) => {
  try {
    const user = await usersModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (user[0] == 1) {
      res.status(200).json({
        message: "¡User update correctly",
      });
    } else {
      res.status(400).json({ message: "id not found or nathing to change" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Eliminar un registro
export const deleteUser = async (req, res) => {
  try {
    const user = await usersModel.destroy({
      where: { id: req.params.id },
    });
    if (user) {
      res.status(200).json({
        message: "User removed correctly",
      });
    } else {
      res.status(400).json({ message: "id not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
