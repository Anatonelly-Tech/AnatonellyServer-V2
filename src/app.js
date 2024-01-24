const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Database connection
const connection = require('./database/connect');
connection();

// Routes
const routes = require('./routes/router');

app.use('/api', routes);
app.listen(3000, () => console.log('Server is running on port 3000.'));