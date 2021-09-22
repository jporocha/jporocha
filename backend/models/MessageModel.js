const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sentBy: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  read: { type: Boolean, default: false },
});

const model = mongoose.model("Message", messageSchema, "Message");

module.exports = model;
