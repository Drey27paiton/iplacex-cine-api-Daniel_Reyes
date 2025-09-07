import { MongoClient, ServerApiVersion  } from "mongodb";

let dbConnection = "mongodb+srv://dani27arr_db_user:vQ8Xdjl3Q4dZmxZb@cluster-express.lrjm1vv.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express"

const client = new MongoClient(dbConnection, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })


export default client;