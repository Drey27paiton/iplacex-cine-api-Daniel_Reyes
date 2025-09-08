import { ObjectId } from "mongodb";
import client from '../common/db.js'
import { Actor } from "./actor.js";

const database = client.db('cine-db');
const actorCollection = database.collection('actores');
const peliculaCollection = database.collection('peliculas');

async function handleInsertActorRequest(req, res){
    let data = req.body;
    let actor = Actor;

    actor.idPelicula = data.idPelicula;
    actor.nombre = data.nombre;
    actor.edad = data.anioEstreno;
    actor.estaRetirado = data.estaRetirado;
    actor.premios = data.premios;
    try {
        let oid = ObjectId.createFromHexString(actor.idPelicula)
        if (await peliculaCollection.findOne({_id:oid}) != null) {
            await actorCollection.insertOne(actor)
            .then((d)=>{
                if (d === null) return res.status(400).send(d)

                    return res.status(201).send(d)
            })
            .catch((e)=>{
                console.log(e)
                return res.status(500).send({aqui:true, code: e})
            })
        } else {
            return res.status(404).send("No hay peliculas con este ID")
        }
    } catch (error) {
        return res.status(400).send("Este id no cumple con el formato")
    }



}

async function handleGetActorByIdRequest(req, res){
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({_id:oid})
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

    await actorCollection.findOne({_id:id})
}

async function handleGetActorsRequest(req, res){
    await actorCollection.find({}).toArray()
    .then((data) => {
        return res.status(200).send(data)
    })
    .catch((e)=>{
        return res.status(500).send({code: e.code})
    })
}

async function handleUpdateActorByIdRequest(req, res){
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)
        let data = res.body

        let query = {$set:data}

        await actorCollection.updateOne({_id:oid}, query)
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

async function handleDeleteActorByIdRequest(req, res){
    let id = req.params.id
    try{
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.deleteOne({_id:oid})
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

async function handleGetActoresByPeliculaRequest(req, res){
    let idPelicula = req.params.pelicula
    try{
        if(await peliculaCollection.findOne({_id:ObjectId.createFromHexString(idPelicula)}) != null){
            await actorCollection.find({idPelicula:idPelicula}).toArray()
            .then((data) =>{
                if (data === null) return res.status(404).send(data)

                return res.status(200).send(data)
            })
            .catch((e)=>{
                return res.status(500).send({code:e.code})
            })
        }else{
            return res.status(404).send("No hay peliculas con este ID")
        }

    }catch{
        return res.status(500).send("Id mal formado")
    }
}

export default {
    handleDeleteActorByIdRequest,
    handleGetActorByIdRequest,
    handleGetActorsRequest,
    handleInsertActorRequest,
    handleUpdateActorByIdRequest,
    handleGetActoresByPeliculaRequest,
}