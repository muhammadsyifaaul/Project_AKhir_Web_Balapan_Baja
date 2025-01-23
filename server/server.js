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


app.use(session({
    secret: 'ABOGOBOGAYEAMPLOWWNALDSHHSDTHTORHROT',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000, httpOnly: false } // 1 day
}));

  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
connectDb();
const authRoutes = require("./Routes/authRoutes");

app.use("/", authRoutes);
app.use(mainRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
