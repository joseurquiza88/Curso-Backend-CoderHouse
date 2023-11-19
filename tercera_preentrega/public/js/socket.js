//Logica del socket para los mensajes
const socket = io();

socket.on('connection', () => {
  console.log('Cliente conectado');

  // Enviar un mensaje al servidor
  socket.emit('mensaje', 'nuevo cliente conectado');
});

// Escuchar el evento "mensaje" desde el servidor
socket.on('mensaje', (message) => {
  const messageList = document.getElementById('message-list');
  const messageItem = document.createElement('li');
  messageItem.textContent = message;
  messageList.appendChild(messageItem);
});

const input = document.getElementById('message-input');
const buttonSocket = document.getElementById('send-button');

// Enviar mensaje
buttonSocket.addEventListener('click', () => {
  const message = input.value;
  if (message) {
    socket.emit('mensaje', message); // Enviar el mensaje al servidor
    input.value = '';
  }
});