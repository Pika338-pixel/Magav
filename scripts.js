// Function to load all messages from local storage
function loadMessages() {
  const messagesContainer = document.querySelector('.forum-messages');
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  
  messagesContainer.innerHTML = ''; // Clear the container before adding new messages

  messages.forEach((message, index) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    messageElement.innerHTML = `
      <p class="category">${message.category}</p>
      <p>${message.message}</p>
      <button class="delete-btn" onclick="deleteMessage(${index})">מחק</button>
    `;
    
    messagesContainer.appendChild(messageElement);
  });
}

// Function to add a new message
function addMessage() {
  const categorySelect = document.querySelector('#category');
  const messageInput = document.querySelector('#message');
  
  const newMessage = {
    category: categorySelect.value,
    message: messageInput.value
  };

  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push(newMessage);

  // Save messages back to localStorage
  localStorage.setItem('messages', JSON.stringify(messages));

  // Clear input fields
  categorySelect.value = '';
  messageInput.value = '';

  // Reload the messages
  loadMessages();
}

// Function to delete a message
function deleteMessage(index) {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  
  // Remove the message at the specified index
  messages.splice(index, 1);
  
  // Save updated messages back to localStorage
  localStorage.setItem('messages', JSON.stringify(messages));
  
  // Reload the messages
  loadMessages();
}

// Event listener to add a message when the form is submitted
document.querySelector('#forum-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page refresh
  addMessage();
});

// Load messages when the page is loaded
document.addEventListener('DOMContentLoaded', loadMessages);

  
