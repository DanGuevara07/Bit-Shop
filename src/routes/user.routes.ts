import Express from "express"
// las llaves importan especificamente una clase y no la libreria completa
import { Router } from "express";
import Controllers from "../controllers"

const router = Router()

// crear un usuario
router.post("/create", Controllers.User.createUser)

router.post("/login", Controllers.User.login)


export default router