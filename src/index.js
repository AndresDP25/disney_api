import express from "express";
import { PORT } from "./config/config.js";
import morgan from "morgan";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import characters from "./routes/characters.js";
import movies from "./routes/movies.js";
import db from "./database/db.js";
import charactersModel from "./models/charactersmovie.js";

const app = express();

// app.use(cors());
app.use(express.json());
//para capturar datos de formularios,está en false porque no vamos a recibir img
app.use(express.urlencoded({ extended: false }));
//Registrador de solicitudes
app.use(morgan("dev"));

app.use("/auth", auth);
app.use("/users", users);
app.use("/characters", characters);
app.use("/movies", movies);

//verificación de conexión a la db
try {
  await db.authenticate();
  // hacemos que se cree una nueva db con el modelo
  // db.sync({ alter: true });
  db.sync({ force: false });
  console.log("DB loaded and connected");
} catch (error) {
  console.log(`Error conection: ${error}`);
}

app.listen(PORT, () => {
  console.log(`Server UP running in http://localhost:${PORT}/`);
});
