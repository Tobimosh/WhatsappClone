const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.querySelector('.send-button');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');

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

searchButton.addEventListener('click', searchContact);

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchContact();
  }
});

function searchContact() {
  const searchTerm = searchInput.value.trim();
  const chatList = document.querySelector('.chat-list');
  const chatItems = chatList.getElementsByClassName('chat-item');

  let found = false;

  for (let i = 0; i < chatItems.length; i++) {
    const chatItem = chatItems[i];
    const name = chatItem.querySelector('.chat-details h3').textContent;

    if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
      chatItem.style.display = 'flex';
      found = true;
    } else {
      chatItem.style.display = 'none';
    }
  }

  if (!found) {
    const errorMessage = `You don't have "${searchTerm}" on your chat list.`;
    alert(errorMessage);
    searchInput.value = ''; 
    Array.from(chatItems).forEach((chatItem) => {
      chatItem.style.display = 'flex';
    });
  }
}

// Get the chat items and chat display element
const chatItems = document.querySelectorAll('.chat-item');
const chatDisplay = document.querySelector('.chat-messages');

// Add event listeners to chat items
chatItems.forEach((chatItem) => {
  chatItem.addEventListener('click', () => {
    // Remove any active class from other chat items
    chatItems.forEach((item) => item.classList.remove('active'));

    // Add active class to the clicked chat item for visual feedback
    chatItem.classList.add('active');

    // Get the chat ID from the clicked chat item
    const chatId = chatItem.dataset.chatId;

    // Update the chat display based on the selected chat item
    updateChatDisplay(chatId);
  });
});

// Function to update the chat display based on the selected chat item
function updateChatDisplay(chatId) {
  const messagesContainer = document.querySelector('.chat-messages');

  messagesContainer.innerHTML = '';
  const messages = getChatMessages(chatId);

  messages.forEach((message) => {
    const messageElement = createMessageElement(message);
    messagesContainer.appendChild(messageElement);
  });
}

function createMessageElement(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  const senderElement = document.createElement('div');
  senderElement.classList.add('sender');
  
  senderElement.textContent = message.sender;
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = message.content;

  messageElement.appendChild(senderElement);
  messageElement.appendChild(contentElement);

  return messageElement;
}



