import { ObjectId } from "mongodb";
import client from '../common/db.js'
import { Pelicula } from "./pelicula.js";

const database = client.db('cine-db');
const peliculaCollection = database.collection('peliculas');

async function handleInsertPeliculaRequest(req, res){
    let data = req.body;

    let pelicula = Pelicula;

    pelicula.nombre = data.nombre;
    pelicula.generos = data.generos;
    pelicula.anioEstreno = data.anioEstreno;
    console.log('hablalo')
    await peliculaCollection.insertOne(pelicula)
    .then((d)=>{
        // Si no hay datos:
        if (d === null) return res.status(400).send(d)
            // Si tenemos datos:

            return res.status(201).send(d)
    })
    .catch((e)=>{
        console.log(e)
        return res.status(500).send({aqui:true, code: e})
    })

}

async function handleGetPeliculaByIdRequest(req, res){
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.findOne({_id:oid})
        .then((data) => {
            if (data === null) return res.status(404).send(data)
            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({code:e.code})
        }) 
    }catch (e) {
        return res.status(500).send('id mal formado')
    }

    await peliculaCollection.findOne({_id:id})
}

async function handleGetPeliculasRequest(req, res){
    await peliculaCollection.find({}).toArray()
    .then((data) => {
        return res.status(200).send(data)
    })
    .catch((e)=>{
        return res.status(500).send({code: e.code})
    })
}

async function handleUpdatePeliculaByIdRequest(req, res){
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)
        let data = res.body

        let query = {$set:data}

        await peliculaCollection.updateOne({_id:oid}, query)
        .then((data) => {
            if (data === null) return res.status(404).send(data)
            
            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({code:e.code})
        }) 
    }catch (e) {
        return res.status(500).send('id mal formado')
    }

}

async function handleDeletePeliculaByIdRequest(req, res){
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.deleteOne({_id:oid})
        .then((data) => {
            if (data === null) return res.status(404).send(data)
            
            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({code:e.code})
        }) 
    }catch (e) {
        return res.status(500).send('id mal formado')
    }

}

export default {
    handleDeletePeliculaByIdRequest,
    handleGetPeliculaByIdRequest,
    handleGetPeliculasRequest,
    handleInsertPeliculaRequest,
    handleUpdatePeliculaByIdRequest,
}