//importamos la conexión a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";


//Definimos nuestro modelo de entrada de la info.
const loginModel = db.define('users', {
    hash: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
}, {
    timestamps: false,
});


export default loginModel



