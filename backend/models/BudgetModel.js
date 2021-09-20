const mongoose = require("mongoose");

let jobSchema = new mongoose.Schema({
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  jobDescription: { type: String, required: true },
  jobValue: { type: Number, required: true },
});

let budgetSchema = new mongoose.Schema({
  madeBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  madeFor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobs: { type: [jobSchema], default: [] },
});

const model = mongoose.model("User", userSchema, "Users");

module.exports = model;
