const express = require("express");
const session = require("express-session");
const app = express();
const connectDb = require("./Config/connectDb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const mainRoutes = require("./Routes/mainRoutes");

// app.use(
//     session({
//       secret: "ABOGOBOGAYEAMPLOWWNALDSHHSDTHTORHROT",
//       resave: false,
//       saveUninitialized: true,
//       cookie: {
//         maxAge: 1000 * 60 * 60 * 24,
//         httpOnly: false,
//       },
//     })
//   );
const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/balapan_baja' }),
  cookie: { secure: false, httpOnly: false, maxAge: 86400000, sameSite: 'None' }
}));



  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));
connectDb();
const authRoutes = require("./Routes/authRoutes");

app.use("/", authRoutes);
app.use(mainRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
