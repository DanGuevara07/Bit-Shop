import { Router } from "express"
import User from "./user.routes"
import Product from "./product.routes"

const router = Router()

// rutas del API 


// rutas del usuario
router.use("/user", User )

//rutas de los productos

router.use("/product", Product )

export default router