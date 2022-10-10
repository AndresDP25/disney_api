import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMailUser from "../utils/nodemailerUser.js";
import UserServices from "../service/user.services.js";


class Auth {

  async register(req, res) {
    try {
      const password = req.body.password;
      const passwordVerification = req.body.passwordVerification;

      if (password !== passwordVerification) {
        res.status(400).send("Las contraseñas no coinciden")
        return
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const userExist = await User.exists({ email: req.body.email });

      if (userExist) {
         res.status(400).send("El usuario ya existe")
         return      
      } 
      
       const user = await UserServices.save(req.body, passwordHash)

      const data = {
        name: user.name,
        password: user.password,
      };
      const token = jwt.sign(data, process.env.PRIVATE_KEY);
      const  tokenAge = (30 * 24 * 60 * 60) // 30 days

      await sendMailUser(user)

      
      res.cookie("token", token, { maxAge: tokenAge })
      res.send(token)
    } catch (error) {
      res.send(error);
    }
  }
  async login(req, res) {
  
    const user = await User.findOne({ email: req.body.email });

    if(!user){
      res.status(400).send("Revise si el usuario y la contraseña son correctos")
      return
    }

    const passwordsMatch = await bcrypt.compare(req.body.password,user.password)

    if(!passwordsMatch){
      res.status(400).send("Revise si el usuario y la contraseña son correctos")
      return
    }

    const data = {
      email: user.email,
      name: user.name,
    };
    const  tokenAge = (30 * 24 * 60 * 60) // 30 days
    const token = jwt.sign(data, process.env.PRIVATE_KEY);
    res.cookie("token", token, { maxAge: tokenAge })
    res.cookie("email", data.email , { maxAge: tokenAge })
    res.send(token)
    // res.redirect('/products')
  }
}

export default  new Auth();
