const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const messageRoutes = require('./app/routes/message');
require('dotenv').config();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.send('you are connected');
});

// set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

messageRoutes(app);
