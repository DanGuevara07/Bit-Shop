import Express from "express"
// las llaves importan especificamente una clase y no la libreria completa
import { Router } from "express";
import Controllers from "../controllers"

const router = Router()

// rutas de usuario
router.post("/create", Controllers.User.createUser)
router.get("/getAll", Controllers.User.getUsers)
router.get("/getUser/:username", Controllers.User.getUser)
router.put("/updateUser", Controllers.User.updateUser)




export default router