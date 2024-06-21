// const { routePlanning } = require("../controllers/routeplanner.controller");

exports.setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle route planning via socket
    // routePlanning(socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // Emit updates periodically or based on certain events
    setInterval(() => {
      socket.emit("update", { type: "alert", message: "New alien sighting!" });
    }, 10000);
  });
};
