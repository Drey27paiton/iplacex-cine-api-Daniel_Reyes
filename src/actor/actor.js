import { ObjectId, BSONType, BSON } from "mongodb";

export const Actor = {
    _id: ObjectId,
    idPelicula:BSON.string,
    nombre: BSONType.string,
    edad: BSONType.int,
    estaRetirado: BSON.bool,
    premios: BSONType.array,
};