const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const { Token, User, Report, Chat, Message } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const logger = require("../config/logger");

const createChat = async (chatData, currentUser) => {
  const { name, members } = chatData;
  const chat = await Chat.create({
    name,
    members,
    createdBy: currentUser._id,
  });
  return chat;
};

const addUserToChat = async (chatData, currentUser) => {
  const { chatId, userToBeAddedId } = chatData;

  const activeChat = await Chat.findOne({ _id: chatId });
  if (!activeChat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Chat");
  }

  const isValidUser = await User.findOne({ _id: userToBeAddedId });
  if (!isValidUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid User");
  }

  if (activeChat.members.includes(userToBeAddedId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exist");
  }

  activeChat.members.push(userToBeAddedId);

  await activeChat.save();
  return activeChat;
};

const getAllMyChat = async (currentUser) => {
  const groupChats = await Chat.find({
    members: currentUser._id,
  }).populate("members", "fullName");
  const allChats = [...groupChats];
  const uniqueChats = Array.from(new Set(allChats.map((chat) => chat._id))).map(
    (id) => allChats.find((chat) => chat._id.equals(id))
  );

  return uniqueChats;
};

const getMessages = async (messageBody) => {
  const { chatId } = messageBody;

  const isChatActive = await Chat.findById(chatId);

  if (!isChatActive) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid chat");
  }

  const messages = await Message.find({ chat: chatId })
    .populate("sender")
    .sort("createdAt");
  if (!messages) {
    return "No messages";
  }
  return messages;
};

module.exports = {
  createChat,
  getAllMyChat,
  addUserToChat,
  getMessages,
};
