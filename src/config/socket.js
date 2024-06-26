const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Report = require("../models/report.model");
const Message = require("../models/message.model");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", async (data) => {
      const { content, senderId, chatId } = data;
      const message = await Message.create({
        content,
        sender: senderId,
        chat: chatId,
      });
      io.to(chatId).emit("receiveMessage", {
        content: message.content,
        sender: message.sender,
        chat: message.chat,
        createdAt: message.createdAt,
      });
    });

    Report.watch().on("change", (change) => {
      console.log("hello trigger");
      if (change.operationType === "insert") {
        const newReport = change.fullDocument;
        io.emit("newReport", {
          ...newReport,
          message: "New report",
        });
      } else if (change.operationType === "update") {
        const updatedReport = change.updateDescription.updatedFields;
        io.emit("updateReport", {
          ...updatedReport,
          message: "Report updated",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = setupSocket;
