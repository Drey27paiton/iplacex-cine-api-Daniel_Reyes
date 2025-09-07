import express, { urlencoded } from "express"; 
import cors from "cors"
import myCorsConfig from "./data.json" with {type:'json'}
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express()
const port = 3000 || 4000

app.use(cors(myCorsConfig))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', peliculaRoutes)
app.use('/api', actorRoutes)


app.get('/', cors(myCorsConfig), (req, res) => {
    res.status(200).send("Bienvenido al cine Iplacex")
})


app.listen(port, () => {
    console.log(`${port}`)
})