const mongoose = require("mongoose");

let addressSchema = new mongoose.Schema({
  rua: { type: String, required: true },
  numero: { type: Number, required: true },
  complemento: { type: String },
  bairro: { type: String },
  cep: { type: Number },
  cidade: { type: String },
  estado: { type: String },
});

const model = mongoose.model("Address", addressSchema, "Address");

module.exports = model;
