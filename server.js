import express from 'express';
import dotenv from "dotenv/config";
import { fileURLToPath } from "url"
import path from 'path';
import connectDB, { getDB } from './db/conneciton.js';

const __filename = fileURLToPath(import.meta.url) // Dir name assignment to script
const __dirname = path.dirname(__filename)


const Env_obj = process.env // injecting .env
const port = Env_obj.PORT || 3000
const MONGO_URI = Env_obj.MONGO_URI

await connectDB() // initiate connection to db

const app = express()
app.use(express.static('public')); // Serve static files from 'public' directory

// ENV use for port and mongoDB connection


// Take notes brother hehehe :)
// | Step              | What it does                 |
// | ----------------- | ---------------------------- |
// | `import.meta.url` | Gives file location as a URL |
// | `fileURLToPath()` | Converts URL → real path     |
// | `path.dirname()`  | Gets the folder path         |

app.get('/', (req, res) => { // Route for home page
  // const db = getDB()
  res.sendFile(path.join(__dirname, "public/Jenny.html"))
  // const status = db.collection('test_collection').insertOne({
  //   test1:10,
  //   test2:'string',
  //   test3:true
  // })
});

app.get('/testdb', async (req, res)=>{
  const db = getDB()
  const status = await db.collection('test_collection').insertOne({
    test1:10,
    test2:'string',
    test3:true
  })
  console.log(status)
  res.json({db_operation_status: status})
})

app.get("/news", async(req, response)=>{ // API calls for news
  try {
    const res = await fetch("https://news.knowivate.com/api/latest")
    const Jhonson = await res.json()
    console.log("Got the response from news api")
    response.json(Jhonson)
  } catch (error) {
    response.status(500).json({error: "Error caused by backend server fetch faliure. Try refreshing the page"})

  }
})


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});