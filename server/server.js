const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config()
const path = __dirname + '/views/';
const app = express();
app.use(express.static(path));
// let corsOptions = {
//   origin: "http://localhost:8081",
// };
app.use(cors({credentials:true, origin:['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080', 'http://127.0.0.1:8080', 'https://alfian-arya.github.io/', 'https://capilaonline.me/', 'http://168.138.180.185:3000'] }));
// parse requests of content-type - application/json
app.use(cookieParser())
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to test application." });
// });
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});
require("./routes/routes.js")(app);
require("./routes/adminRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
