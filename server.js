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

// HTTP response header to allow pae indexing
app.use((req, res, next) => {
  res.set("X-Robots-Tag", "index, follow");
  next();
});

app.get('/', (req, res) => { // Route for home page
  res.sendFile(path.join(__dirname, "public/Jenny.html"))
});

app.get('/testdb_Uname', async (req, res) => {

  let date = new Date()    // Time stamp
  let Year = String(date.getFullYear())
  let Mon = String(date.getMonth() + 1).padStart(2, '0')
  let Day = String(date.getDate()).padStart(2, 0)
  let Hour = String(date.getHours()).padStart(2, '0')
  let Min = String(date.getMinutes()).padStart(2, '0')
  let Sec = String(date.getSeconds()).padStart(2, '0')

  let User_NameB = req.query.User_NameF // UserName collection
  console.log('SERVER DEBUG LOG --> ', User_NameB)

  try {
    await connectDB()
    var db = getDB() // connection test
    const status = await db.collection('test_collection').insertOne({ // Test data dispatch
      Time: `Date(DD/MM/YYYY):${Day}/${Mon}/${Year} Time: ${Hour}:${Min}:${Sec}`,
      User_Name: User_NameB
    })
    var connec_status_DB = true
    var cem = 'Dispatch succesfull'
    console.log('SERVER LOG--> ', status)
  } catch (error) {
    var connec_status_DB = false
    var cem = String(error)
  }

  console.log('SERVER LOG --> ', cem)

  const Res_Obj = {
    DB_connection_status: {
      connec_status: connec_status_DB,
      connec_err_msg: cem
    }
  }

  res.json(Res_Obj)

})

app.get('/testdb', (req, res) => {
  connectDB().then((resp) => {
    console.log('SERVER LOG--> in the true block')
    res.json({ status_connec: true, err_msg: null})
  }).catch((err) => {
    console.log('SERVER LOG--> in the false block')
    res.json({ status_connec: false, err_msg: err })
  })
})

app.get("/news", async (req, response) => { // API calls for news
  try {
    const res = await fetch("https://news.knowivate.com/api/latest")
    const Jhonson = await res.json()
    console.log('SERVER LOG --> ', "Got the response from news api")
    response.json(Jhonson)
  } catch (error) {
    response.status(500).json({ error: "Error caused by backend server fetch faliure. Try refreshing the page" })
  }
})


// Start server
app.listen(port, () => {
  console.log('SERVER LOG --> ', `Server running on http://localhost:${port}`);
});