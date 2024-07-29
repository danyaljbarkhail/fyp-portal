const express = require('express');
const http = require('http');
const socket = require('./socket');
const app = require('./app');
const PORT = 3000;

const server = http.createServer(app);
const io = socket.init(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
