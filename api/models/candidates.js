const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    cv: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const candidates = mongoose.model("candidates", candidateSchema);
module.exports = candidates;
