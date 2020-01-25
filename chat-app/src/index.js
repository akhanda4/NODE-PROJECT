const path = require("path");
const express = require('express');

const http = require('http');
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let welcome = "welcome new User";
io.on('connection', (socket) => {
    socket.emit('sendMessage', welcome);
    socket.broadcast.emit('sendMessage', 'A new user has joined!');

    socket.on('sendMessage', (message) => {
        io.emit('sendMessage', message);
    })

    socket.on('disconnect', () => {
        io.emit('sendMessage', 'A User has left')
    })
});



server.listen(port, () => {
    console.log(`Server is running on port:`, port)
});