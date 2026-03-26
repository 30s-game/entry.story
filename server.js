const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 정적 파일 폴더
app.use(express.static(path.join(__dirname, "public")));

// 메인 페이지 강제 연결 (Cannot GET / 해결)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 소켓 연결
io.on("connection", (socket) => {
    console.log("유저 접속");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("유저 나감");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("서버 실행중");
});
