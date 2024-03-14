const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const connection = require('./database/connect');
connection();

// Routes
const routes = require('./routes/router');

const port = process.env.PORT || 3030;
app.use('/api', routes);
app.listen(
  {
    host: '0.0.0.0',
    port,
  },
  () => console.log('Server is running on port', port)
);
