//importamos la conexión a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";
import characters from "./characters.js";
import contentType from "./contentType.js";
import genderType from "./genderType.js";

//Definimos nuestro modelo de entrada de la info.
const Movie = db.define(
  "Movie",
  {
    image: { type: DataTypes.STRING(250), allowNull: true },
    title: { type: DataTypes.STRING(250), allowNull: false },
    creationDate: { type: DataTypes.DATE, allowNull: false },
    calification: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    timestamps: false,
  }
);

Movie.belongsTo(contentType, {
  foreignKey: "contentTypeId",
  targetKey: "id",
  as: "contentType",
});

Movie.belongsTo(genderType, {
  foreignKey: "genderTypeId",
  targetKey: "id",
  as: "genderType",
});

export default Movie;
