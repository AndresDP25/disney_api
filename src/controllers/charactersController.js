import charactersModel from "../models/characters.js";
import bcrypt from "bcryptjs";

//Mostrar todos los registros
export const getAllCharacters = async (req, res) => {
  try {
    const characters = await charactersModel.findAll();
    res.status(200).json(characters);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Mostrar un registro
export const getCharacter = async (req, res) => {
  try {
    const character = await charactersModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(character[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Crear un registro
export const createCharacter = async (req, res) => {
  try {
    const { image, name, age, history, weigth } = req.body;
    console.log(req.body);
    await charactersModel.create({
      image: image,
      name: name,
      age: age,
      history: history,
      weigth: weigth,
    });
    res.status(200).json({ message: "Characters created correctly" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Actualizar un registro
export const updateCharacter = async (req, res) => {
  try {
    charactersModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Character update correctly",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Eliminar un registro
export const deleteCharacter = async (req, res) => {
  try {
    charactersModel.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Characters removed correctly",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
