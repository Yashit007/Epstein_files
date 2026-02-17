import express from 'express';

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// const fs = require('fs')
// fs.
import MongoClient  from 'mongodb'
import path from 'path';

const app = express()
const port = 3000

// Take notes brother hehehe :)
// | Step              | What it does                 |
// | ----------------- | ---------------------------- |
// | `import.meta.url` | Gives file location as a URL |
// | `fileURLToPath()` | Converts URL → real path     |
// | `path.dirname()`  | Gets the folder path         |


// Serve static files from 'public' directory
app.use(express.static('public'));

// Route for home page
app.get('/', (req, res) => {
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