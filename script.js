const socket = io('http://localhost:3000');
const messContainer = document.getElementById('message-container');
const messInput = document.getElementById('message-input');
const messForm = document.getElementById('send-container');

// prompt lấy tên kết nối
const name = prompt('Tên bạn là gì ?');

// emit event thông tin người kết nối
appendMessage('Bạn đã tham gia', '', 'left');
socket.emit('new-user', name);

// nhận thông tin chat
socket.on('chat-message', (data) => {
  appendMessage(data.message, data.name, 'left');
});

// nhận thông tin người kết nối
socket.on('user-connected', (data) => {
  appendMessage(`${data} đã kết nối`, 'Bot Chat', 'left');
});

// nhận thông tin người ngắt kết nối
socket.on('user-disconnected', (data) => {
  appendMessage(`${data} đã thoát kết nối`, 'Bot Chat', 'left');
});

// event submit chat
messForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messInput.value;
  appendMessage(message, 'You', 'right');
  socket.emit('send-chat-message', message);
  messInput.value = '';
});

// Hàm tạo chat trên Html
function appendMessage(message, name, align) {
  const messageElement = document.createElement('div');
  messageElement.style.background = '#fff';
  if (name) {
    const messageName = document.createElement('p');
    messageName.innerHTML = name;
    messageElement.appendChild(messageName);
  }

  if (align) {
    messageElement.style.textAlign = align;
  }
  const messageContent = document.createElement('p');
  messageContent.className = 'text';
  messageContent.innerHTML = message;

  messageElement.appendChild(messageContent);

  messContainer.append(messageElement);
}
