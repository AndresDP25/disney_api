//importamos la conexión a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";
import movies from "./movies.js";

//Definimos nuestro modelo de entrada de la info.
const genderTypeModel = db.define(
  "genderType",
  {
    description: { type: DataTypes.STRING(50), allowNull: false },
  },
  {
    timestamps: false,
  }
);

export default genderTypeModel;
