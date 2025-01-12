const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const bodyParser = require('body-parser');
const { connectDb } = require('./Config/connectDb');
const expressSession = require('express-session');
const authRoutes = require('./Routes/authRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
    secret: 'yeamplowwnaldshhsdthtorharot',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(authRoutes);

connectDb(); 

app.listen(5000, () => console.log('Server running on port 5000'));
