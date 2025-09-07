import express from 'express'
import controller from './controller.js'


const actorRoutes = express.Router()

actorRoutes.get('/actores', controller.handleGetActorsRequest)
actorRoutes.get('/actores/:id', controller.handleGetActorByIdRequest)
actorRoutes.post('/actor', controller.handleInsertActorRequest)
actorRoutes.put('/actor/:id', controller.handleUpdateActorByIdRequest)
actorRoutes.delete('/actor/:id', controller.handleDeleteActorByIdRequest)
actorRoutes.get('/actor/:pelicula', controller.handleGetActoresByPeliculaRequest)

export default actorRoutes;