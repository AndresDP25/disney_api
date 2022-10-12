//importamos la conexión a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";
import movies from "./movies.js";

//Definimos nuestro modelo de entrada de la info.
const Character = db.define(
  "Character",
  {
    image: { type: DataTypes.STRING(250), allowNull: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    age: { type: DataTypes.INTEGER, allowNull: true },
    history: { type: DataTypes.STRING(1000), allowNull: false },
    weigth: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    timestamps: false,
  }
);

export default Character;

// Character.belongsToMany(movies, {
//   through: "characterMovies",
//   as: "movies",
//   foreignKey: "characterId",
// });
