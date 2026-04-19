const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    console.log("user connected:", socket.id);

    socket.on("join", (room) => {
        socket.join(room);
    });

    socket.on("offer", (data) => {
        socket.to(data.room).emit("offer", data);
    });

    socket.on("answer", (data) => {
        socket.to(data.room).emit("answer", data);
    });

    socket.on("ice-candidate", (data) => {
        socket.to(data.room).emit("ice-candidate", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
