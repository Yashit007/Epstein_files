import express from 'express';
import dontenv from "dotenv";
import { fileURLToPath } from "url"
import {MongoClient}  from 'mongodb'
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dontenv.config()
const Env_obj = process.env


const app = express()
app.use(express.static('public')); // Serve static files from 'public' directory

// ENV use for port and mongoDB connection
const port = Env_obj.PORT || 3000
const MONGO_URI = Env_obj.MONGO_URI
const client = new MongoClient(MONGO_URI)


// Take notes brother hehehe :)
// | Step              | What it does                 |
// | ----------------- | ---------------------------- |
// | `import.meta.url` | Gives file location as a URL |
// | `fileURLToPath()` | Converts URL → real path     |
// | `path.dirname()`  | Gets the folder path         |

app.get('/', (req, res) => { // Route for home page
  res.sendFile(path.join(__dirname, "public/Jenny.html"))
});

app.get("/news", async(req, response)=>{
  try {
    const res = await fetch("https://news.knowivate.com/api/latest")
    const Jhonson = await res.json()
    console.log("Got the response from news api")
    response.json(Jhonson)
  } catch (error) {
    response.status(500).json({error: "Error caused by backend server fetch faliure. Try refreshing the page"})

  }
})

app.get('')
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});