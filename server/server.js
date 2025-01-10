const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const bodyParser = require('body-parser');
const { connectDb } = require('./Config/connectDb');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb(); 

app.listen(5000, () => console.log('Server running on port 5000'));
