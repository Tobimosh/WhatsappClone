const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.querySelector('.send-button');

function sendMessage() {
  const message = messageInput.value;
  messageInput.value = '';
  const newMessage = document.createElement('div');
  newMessage.className = 'message sent';
  newMessage.innerHTML = `<div class="text">${message}</div>`;
  chatMessages.appendChild(newMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

messageInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

messageInput.addEventListener('input', function() {
  if (messageInput.value.trim() !== '') {
    sendButton.classList.add('active');
    sendButton.innerHTML = '<i class="material-icons">send</i>';
  } else {
    sendButton.classList.remove('active');
    sendButton.innerHTML = '<i class="material-icons">mic</i>';
  }
});

sendButton.addEventListener('click', function() {
  if (sendButton.classList.contains('active')) {
    sendMessage();
    messageInput.value = '';
    sendButton.classList.remove('active');
    sendButton.innerHTML = '<i class="material-icons">mic</i>';
  } else {
    sendMessage();
  }
});
