const express = require("express");
const session = require("express-session");
const app = express();
const connectDb = require("./Config/connectDb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const mainRoutes = require("./Routes/MainRoutes");

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

const corsOptions = {
  origin: [`${process.env.FRONTEND_URL}`], // Tambahkan domain frontend
  credentials: true, // Izinkan pengiriman cookie
};

app.use(cors(corsOptions));

// Pastikan middleware ini dipasang sebelum router lain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Hanya true di production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Gunakan "None" hanya di production
    },
  })
);





  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  
  app.use(cors(corsOptions));
  
  app.use(cors(corsOptions));
  app.use((req, res, next) => {
    next();
  });
    
  
const authRoutes = require("./Routes/authRoutes");

connectDb();
app.use("/", authRoutes);
app.use(mainRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
