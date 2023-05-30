const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.querySelector('.send-button');

function handleInput() {
    const message = messageInput.value;
    messageInput.value = '';
    // Create a new message element
    const newMessage = document.createElement('div');
    newMessage.className = 'message sent';
    newMessage.innerHTML = `<div class="text">${message}</div>`;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
  messageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      handleInput();
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
    // Perform the send message action here
    // You can add your logic or function to send the message
    // For example: sendMessage(messageInput.value);
    messageInput.value = '';
    sendButton.classList.remove('active');
    sendButton.innerHTML = '<i class="material-icons">mic</i>';
  }
});

