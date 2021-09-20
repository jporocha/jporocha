const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sentBy: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Message", messageSchema, "Message");

module.exports = model;
