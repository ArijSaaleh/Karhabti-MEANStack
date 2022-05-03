var express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config({path: __dirname + '/.env'})

var connectDB = require("./database/connection");
var userRoutes = require("./routes/userRoutes");
var vehicleRoute = require("./routes/vehicleRoutes");

var app = express();
app.use(express.json());
connectDB();

// exchanging cookies
app.use(cookieParser());
//to be able to recognize ports between back & front
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
//Routes
app.use("/api/user", userRoutes);
app.use("/api/veh", vehicleRoute);

app.listen(8000);
module.exports = app;
