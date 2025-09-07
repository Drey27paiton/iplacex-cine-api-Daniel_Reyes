import express from 'express'
import controller from './controller.js'


const peliculaRoutes = express.Router()

peliculaRoutes.get('/peliculas', controller.handleGetPeliculasRequest)
peliculaRoutes.get('/peliculas/:id', controller.handleGetPeliculaByIdRequest)
peliculaRoutes.post('/pelicula', controller.handleInsertPeliculaRequest)
peliculaRoutes.put('/pelicula/:id', controller.handleUpdatePeliculaByIdRequest)
peliculaRoutes.delete('/pelicula/:id', controller.handleDeletePeliculaByIdRequest)

export default peliculaRoutes;