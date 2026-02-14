import express from 'express';

import path from 'path'
// const fs = require('fs')
// fs.
import MongoClient  from 'mongodb'

const connec = new MongoClient('mongodb+srv://Britys_kitten:hMivEgrBBRKndDti@cluster0.fe9c94p.mongodb.net/?appName=Cluster0')

const app = express()
const port = 3000

// Serve static files from 'public' directory
app.use(express.static('public'));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Voter_Sathi_Final.html'));
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