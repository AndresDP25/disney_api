//importamos la conexión a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

//Definimos nuestro modelo de entrada de la info.
const usersModel = db.define(
  "users",
  {
    hash: { type: DataTypes.STRING(100), allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    enable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    role: {
      type: DataTypes.ENUM({ values: ["USER_ROLE", "ADMIN_ROLE"] }),
      allowNull: false,
      defaultValue: "USER_ROLE",
    },
  },
  {
    timestamps: false,
  }
);

export default usersModel;
