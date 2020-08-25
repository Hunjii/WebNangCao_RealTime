const io = require('socket.io')(3000);

const users = {};

// Mở kết nối
io.on('connection', (socket) => {
  // event lấy thông tin người kết nối
  socket.on('new-user', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });

  // event nhận chat
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id],
    });
  });

  // event lấy thông tin người ngắt kết nối
  socket.on('disconnect', (name) => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
