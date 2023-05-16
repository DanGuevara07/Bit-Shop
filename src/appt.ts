// importando librerias

import Express from "express"
import dotenv from "dotenv"
import apiRoutes from "./routes/index"
import { connectDB } from "./database"

// CREAR INSTANCIA DE EXPRESS
const app = Express()

//traer el puerto de las variables de entorno
dotenv.config()

//conexión a la base de datos
connectDB()
//establecer el puerto en el cual se ejecuta el API
const port = process.env.PORT || 3200

// establecer usos de express
app.use(Express.json())


//establecer las rutas a utilizar en el api
app.use("/api", apiRoutes)

//ejecución de nuestra api

app.listen(port, () => console.log(`api is running in port ${port}`))