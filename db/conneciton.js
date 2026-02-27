import { MongoClient } from "mongodb";
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({path: path.join(__dirname, "../.env")})

const env_obj = process.env

let db
let client
const connectDB = async ()=>{
    try {
        client = new MongoClient(env_obj.MONGO_URI)
        await client.connect()
        db = client.db('votersaathi')
        console.log('DB_Connection.js LOG --> ','MongoDB connected successfully')
        return db
    } catch (error) {
        console.log('DB_Connection.js LOG --> ', 'connection failed', error)
        // process.exit(1) // crashes the server if DB fails to connect
    }
}

export const getDB = ()=>{
    if(!db){
        throw new Error('DB_Connection.js LOG --> ', 'COuldnt fetch DB from Mongo CLient initialization')
    }
    return db;
}
export default connectDB