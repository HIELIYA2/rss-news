const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const messageRoutes = require('./app/routes/message');
const rss = require('./app/rss');
require('dotenv').config();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['buzzfeed.com/world.xml'],
    credentials: true, // enable set cookie
  })
);

// simple route
app.get('/', (req, res) => {
  res.send('you are connected');
});

// app.listen(80, function () {
//   console.log('Example app listening on port 8000!');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  rss();
  console.log(`Server running at port ${port}`);
});

messageRoutes(app);
