import {Router} from 'express'
import Auth from '../controller/auth.controller.js'


const routeAuth = Router()

routeAuth.post('/register', Auth.register)
routeAuth.post('/login', Auth.login)


export default routeAuth