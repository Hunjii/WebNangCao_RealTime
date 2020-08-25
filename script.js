const socket = io('http://localhost:3000');
const messContainer = document.getElementById('message-container');
const messInput = document.getElementById('message-input');
const messForm = document.getElementById('send-container');

const name = prompt('Tên bạn là gì ?');

appendMessage('Bạn đã tham gia', '', 'left');
socket.emit('new-user', name);

socket.on('chat-message', (data) => {
  appendMessage(data.message, data.name, 'left');
});

socket.on('user-connected', (data) => {
  appendMessage(`${data} đã kết nối`, 'Bot Chat', 'left');
});

socket.on('user-disconnected', (data) => {
  appendMessage(`${data} đã thoát kết nối`, 'Bot Chat', 'left');
});

messForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messInput.value;
  appendMessage(message, 'You', 'right');
  socket.emit('send-chat-message', message);
  messInput.value = '';
});

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
