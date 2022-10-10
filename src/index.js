import express from "express";
import { PORT } from "./config/config.js";
// import cors from "cors";
import morgan from "morgan";
import users from "./routes/users.js";
// import auth from "./routes/auth.js";
// import links from "./routes/links.js";
import db from "./database/db.js";
// import session from "express-session";
// import passport from "passport";

const app = express();

// app.use(cors());
app.use(express.json());
//para capturar datos de formularios,está en false porque no vamos a recibir img
app.use(express.urlencoded({ extended: false }));
//Registrador de solicitudes
app.use(morgan("dev"));

//sesiones
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }))

// app.use(passport.initialize())
// app.use(passport.session())

// app.use("/auth", auth);
// app.use("/users", users);
// app.use("/links", links);

//conexión a la db
try {
  await db.authenticate();
  console.log("DB loaded and connected");
} catch (error) {
  console.log(`Error conection: ${error}`);
}

app.listen(PORT, () => {
  console.log(`Server UP running in http://localhost:${PORT}/`);
});
