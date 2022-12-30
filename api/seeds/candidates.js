const mongoose = require("mongoose");
const candidate = require("../models/candidates");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const urlDb = process.env.MONGO_DB;

const candidates = [
  {
    id: 1,
    name: "Luis",
    surname: "Martínez Enriquez",
    phone: "636505918",
    email: "wifly.sk8@gmail.com",
    cv: "cv",
  },
  {
    id: 2,
    name: "Ricardo",
    surname: "Graña Rosales",
    phone: "666666",
    email: "GrichPapi@gmail.com",
    cv: "cv",
  },
];

const candidatesDocuments = candidates.map(
  (newCandidate) => new candidate(newCandidate)
);
mongoose
  .connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await candidate.insertMany(candidatesDocuments);
    console.log("DatabaseCreated");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
