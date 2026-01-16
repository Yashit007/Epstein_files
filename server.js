const express = require('express')
const path = require('path')

const app = express()
const port = 3000

// Serve static files from 'public' directory
app.use(express.static('public'));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Voter_Sathi_Final.html'));
});
app.get('')
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});