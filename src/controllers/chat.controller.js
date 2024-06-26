const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const { chatService } = require("../services");
const pick = require("../utils/pick");

const createChat = catchAsync(async (req, res) => {
  try {
    const chat = await chatService.createChat(req.body, req.user);
    res.status(httpStatus.OK).send({
      message: "chat created",
      data: chat,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

const getAllMyChat = catchAsync(async (req, res) => {
  try {
    const chat = await chatService.getAllMyChat(req.user);
    res.status(httpStatus.OK).send({
      message: "",
      data: chat,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

module.exports = {
  createChat,
  getAllMyChat,
};
