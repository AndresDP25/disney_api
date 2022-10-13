import moviesModel from "../models/movies.js";
import genderTypeModel from "../models/genderType.js";
import contentTypeModel from "../models/contentType.js";

//Mostrar todos los registros
export const getAllMovies = async (req, res) => {
  try {
    const movies = await MoviesModel.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Mostrar un registro
export const getMovie = async (req, res) => {
  try {
    const movie = await moviesModel.findAll({
      where: {
        id: req.params.id,
      },
    });

    if (movie) {
      res.status(200).json(movie[0]);
    } else {
      res.status(400).json({ message: "id not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Crear un registro
export const createMovie = async (req, res) => {
  try {
    const {
      image,
      title,
      creationDate,
      calification,
      contentType,
      genderType,
    } = req.body;
    const genderTypeDescrption = await genderTypeModel.findOne({
      where: { description: genderType },
    });
    const genderTypeId = genderTypeDescrption.dataValues.id;
    const contentTypeDescrption = await contentTypeModel.findOne({
      where: { description: contentType },
    });
    const contentTypeId = contentTypeDescrption.dataValues.id;
    await moviesModel.create({
      image: image,
      title: title,
      creationDate: creationDate,
      calification: calification,
      contentTypeId: contentTypeId,
      genderTypeId: genderTypeId,
    });
    res.status(200).json({ message: "Movies created correctly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Actualizar un registro
export const updateMovie = async (req, res) => {
  try {
    const movie = await moviesModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (movie[0] == 1) {
      res.status(200).json({
        message: "Movie update correctly",
      });
    } else {
      res.status(400).json({ message: "id not found or nathing to change" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Eliminar un registro
export const deleteMovie = async (req, res) => {
  try {
    const movie = await moviesModel.destroy({
      where: { id: req.params.id },
    });
    if (movie) {
      res.status(200).json({
        message: "Movies removed correctly",
      });
    } else {
      res.status(400).json({ message: "id not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
