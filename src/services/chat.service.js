const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const { Token, User, Report, Chat } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/token");
const logger = require("../config/logger");

const createChat = async (chatData, currentUser) => {
  const { name, members, isGroupChat } = chatData;
  const chat = await Chat.create({
    name,
    members,
    isGroupChat,
    createdBy: currentUser._id,
  });
  return chat;
};

const getAllMyChat = async (currentUser) => {
  const createdChats = await Chat.find({ createdBy: currentUser._id });
  const groupChats = await Chat.find({
    isGroupChat: true,
    members: currentUser._id,
  });
  const allChats = [...groupChats, ...createdChats];
  const uniqueChats = Array.from(new Set(allChats.map((chat) => chat._id))).map(
    (id) => allChats.find((chat) => chat._id.equals(id))
  );

  return uniqueChats;
};

module.exports = {
  createChat,
  getAllMyChat,
};
