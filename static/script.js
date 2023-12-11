const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage !== "") {
    appendMessage(userMessage, "user");
    simulateBotResponse(userMessage);
    userInput.value = "";
  }
}

function appendMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage !== "") {
    appendMessage(userMessage, "user");
    sendUserMessageToServer(userMessage);
    userInput.value = "";
  };
};

function sendUserMessageToServer(message) {
  fetch('/get_response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `user_message=${encodeURIComponent(message)}`,
  })
  .then(response => response.json())
  .then(data => {
    const botResponse = data.bot_response;
    appendMessage(botResponse, "bot");
  })
  .catch(error => console.error('Error:', error));
};

userInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
  sendBtn.click();
  }
});
// ... rest of the code ...
