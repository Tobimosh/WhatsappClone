const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.querySelector('.send-button');
const searchInput = document.getElementById('searchInput');

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


  // Add event listener for the 'input' event
  searchInput.addEventListener('input', handleSearch);
  // Function to handle search
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase(); // Get the search term and convert it to lowercase
    // Get all the chat item elements
    const chatItems = document.getElementsByClassName('chat-item');

    // Loop through each chat item and check if the name matches the search term
    for (let i = 0; i < chatItems.length; i++) {
      const chatItem = chatItems[i];
      const chatName = chatItem.getElementsByClassName('chat-details')[0].getElementsByTagName('h3')[0].textContent.toLowerCase();

      // If the search term is found in the name, show the chat item; otherwise, hide it
      if (chatName.includes(searchTerm)) {
        chatItem.style.display = 'flex';
      } else {
        chatItem.style.display = 'none';
      }
    }
  }
