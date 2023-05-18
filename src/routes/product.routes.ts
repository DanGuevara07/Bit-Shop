import Express from "express"
// las llaves importan especificamente una clase y no la libreria completa
import { Router } from "express";
import Controllers from "../controllers"

const router = Router()

// rutas de usuario
router.post("/create", Controllers.Product.createProduct)
router.get("/getAll", Controllers.Product.getProducts)
router.get("/getProduct/:name", Controllers.Product.getProduct)
router.put("/updateProduct", Controllers.Product.updateProduct)
router.delete("/deleteProduct/:id", Controllers.Product.deleteProduct)




export default router