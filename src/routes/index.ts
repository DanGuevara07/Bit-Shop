import { Router } from "express"
import User from "./user.routes"

const router = Router()

// rutas del API 


// rutas del usuario
router.use("/user", User )

//rutas de los productos

export default router