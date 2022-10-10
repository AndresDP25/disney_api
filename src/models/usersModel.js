//importamos la conexión a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

//Definimos nuestro modelo de entrada de la info.
const usersModel = db.define(
  "users",
  {
    username: { type: DataTypes.STRING },
    hash: { type: DataTypes.STRING },
    fullname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

export default usersModel;
