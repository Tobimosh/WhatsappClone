const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.querySelector('.send-button');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');
const chatItems = document.querySelectorAll('.chat-item');
const chatDisplay = document.querySelector('.chat-messages');
const chatHeaderName = document.querySelector('.header-main .chat-details h3');
const chatHeaderSubtitle = document.querySelector('.header-main .chat-details p');
const chatHeaderImage = document.querySelector('.header-left img');


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

chatItems.forEach((chatItem) => {
  chatItem.addEventListener('click', () => {
    chatItems.forEach((item) => item.classList.remove('active'));
    chatItem.classList.add('active');
    const chatId = chatItem.dataset.chatId;
    updateChatDisplay(chatId);
  });
});

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


chatItems.forEach(chatItem => {
  chatItem.addEventListener('click', () => {
    const name = chatItem.querySelector('.chat-details h3').textContent;
    const subtitle = chatItem.querySelector('.chat-details p').textContent;
    const imageSrc = chatItem.querySelector('img').getAttribute('src');
    chatHeaderName.textContent = name;
    chatHeaderSubtitle.textContent = subtitle;
    chatHeaderImage.setAttribute('src', imageSrc);
  });
});


