const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Chat",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
