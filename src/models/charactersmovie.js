//importamos la conexión a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";
import movies from "./movies.js";
import characters from "./characters.js";

//Definimos nuestro modelo de entrada de la info.
const Charactermovies = db.define(
  "Charactermovies",
  {
    selfGranted: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
  }
);

characters.belongsToMany(movies, { through: Charactermovies });
movies.belongsToMany(characters, { through: Charactermovies });

export default Charactermovies;
