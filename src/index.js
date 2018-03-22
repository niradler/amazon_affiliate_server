require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const routes =require('./routes');

const app = express()
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/', routes);

// initialize the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('App listening on port '+PORT))