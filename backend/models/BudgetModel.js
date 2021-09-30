const mongoose = require("mongoose");

let fileSchema = new mongoose.Schema({
  filename: String,
  validade: String,
  key: String,
  mimetype: String,
});

let budgetSchema = new mongoose.Schema({
  profissionalHabilitado: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tipoProjeto: String,
  contrato: String,
  anexos: {
    type: [fileSchema],
    default: [],
  },
  bucketCounter: {
    type: Number,
    default: 0,
  },
});

const model = mongoose.model("Job", budgetSchema, "Jobs");

module.exports = model;
