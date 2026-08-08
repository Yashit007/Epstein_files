import express from 'express';
import dotenv from "dotenv/config";
import { fileURLToPath } from "url"
import path from 'path';
import connectDB, { getDB } from './db/conneciton.js';

const __filename = fileURLToPath(import.meta.url); // Get current file path as URL
const __dirname = path.dirname(__filename);        // Extract directory path

const Env_obj = process.env; // Load environment variables
const port = Env_obj.PORT || 3000;                 // Server port (default 3000)
const MONGO_URI = Env_obj.MONGO_URI;               // MongoDB connection string

const app = express();
app.use(express.static('public')); // Serve static files from 'public' directory

// Add X-Robots-Tag header to allow search engine indexing
app.use((req, res, next) => {
  res.set("X-Robots-Tag", "index, follow");
  next();
});

// Home route - serves the main landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/Jenny.html"));
});

// POST /testdb_Uname - Insert username with timestamp into MongoDB
app.get('/testdb_Uname', async (req, res) => {
  const now = new Date();
  const timestamp = now.toLocaleString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  }).replace(',', '');

  const userName = req.query.User_NameF;
  console.log('SERVER DEBUG LOG --> ', userName);

  try {
    await connectDB();
    const db = getDB();
    const result = await db.collection('test_collection').insertOne({
      Time: `Date(DD/MM/YYYY) ${timestamp}`,
      User_Name: userName
    });
    console.log('SERVER LOG --> ', result);
    return res.json({
      DB_connection_status: {
        connec_status: true,
        connec_err_msg: 'Dispatch successful'
      }
    });
  } catch (error) {
    console.error('SERVER ERROR --> ', error);
    return res.json({
      DB_connection_status: {
        connec_status: false,
        connec_err_msg: error.message
      }
    });
  }
});

// GET /testdb - Simple MongoDB connection health check
app.get('/testdb', async (req, res) => {
  try {
    await connectDB();
    console.log('SERVER LOG --> DB connection successful');
    res.json({ status_connec: true, err_msg: null });
  } catch (err) {
    console.error('SERVER LOG --> DB connection failed:', err);
    res.json({ status_connec: false, err_msg: err.message });
  }
});

// GET /news - Proxy fetch from external news API
app.get("/news", async (req, res) => {
  try {
    const response = await fetch("https://news.knowivate.com/api/latest");
    const data = await response.json();
    console.log('SERVER LOG --> ', "Fetched news from external API");
    res.json(data);
  } catch (error) {
    console.error('SERVER ERROR --> News fetch failed:', error);
    res.status(500).json({ error: "Failed to fetch news. Please try again later." });
  }
});

// Start server
app.listen(port, () => {
  console.log('SERVER LOG --> ', `Server running on http://localhost:${port}`);
});