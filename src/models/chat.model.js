const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  name: {
    type: String,
    required: function () {
      return this.isGroupChat;
    },
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  members: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
