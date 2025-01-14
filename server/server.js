const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const connectDb = require('./Config/connectDb');
const cors = require('cors');
require('dotenv').config();
const mainRoutes = require('./Routes/mainRoutes');

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
}));
// Middleware untuk session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Middleware untuk parsing body request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDb();
// Import router
const authRoutes = require('./Routes/authRoutes');

app.use('/', authRoutes);
app.use(mainRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
