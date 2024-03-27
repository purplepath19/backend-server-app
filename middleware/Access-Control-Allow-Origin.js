const express = require('express');
const app = express();

// Allow requests from http://localhost:5173
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Other CORS headers like Access-Control-Allow-Methods, Access-Control-Allow-Headers, etc. can be set here if needed
  next();
});

// Other server routes and middleware...

// app.listen(4000, () => {
//   console.log('Server is running on port 4000');
// });
