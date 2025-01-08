const express = require('express');
const db = require('./models'); 

const app = express();


app.use(express.json());


// Start server
const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
