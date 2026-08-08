import { MongoClient } from "mongodb";
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const env_obj = process.env;

let db;
let client;

const connectDB = async () => {
  try {
    client = new MongoClient(env_obj.MONGO_URI);
    await client.connect();
    db = client.db('votersaathi');
    console.log('DB_Connection.js LOG --> MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('DB_Connection.js LOG --> Connection failed:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('DB_Connection.js LOG --> Could not fetch DB from MongoDB client initialization');
  }
  return db;
};

export default connectDB;