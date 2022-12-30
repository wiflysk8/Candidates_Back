const express = require("express");
const { connect } = require("./config/skatedb");
const candidateRoutes = require("./api/routes/candidate.routes");

const cors = require("cors");
const logger = require("morgan");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "deza4wcxi",
  api_key: "399756248791617",
  api_secret: "HIUKd-5fINwJU5mNKjH6sHsOHD0",
});

connect();

const PORT = 5000;
const server = express();

//HEADERS-CABECERAS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//CORS
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//DEFINO LA SECRETKEY
server.set("secretKey", "supercalifragilisticuespialodoso");

//USO EL LOGGER
server.use(logger("dev"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/candidates", candidateRoutes);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
