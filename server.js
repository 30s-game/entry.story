const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 메인 페이지 직접 출력
app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>채팅</title>
<style>
body { margin:0; font-family:sans-serif; }
#messages { height:80vh; overflow-y:auto; }
input { width:70%; font-size:18px; }
button { width:25%; font-size:18px; }
</style>
</head>
<body>

<ul id="messages"></ul>
<input id="input">
<button onclick="send()">전송</button>

<script src="/socket.io/socket.io.js"></script>
<script>
const socket = io();

function send() {
    const input = document.getElementById("input");
    socket.emit("chat message", input.value);
    input.value = "";
}

socket.on("chat message", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messages").appendChild(li);
});
</script>

</body>
</html>
    `);
});

// 소켓
io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

server.listen(process.env.PORT || 3000);
