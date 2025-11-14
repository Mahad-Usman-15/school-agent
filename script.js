const ChatInput = document.querySelector(".chat-input textarea");
const sendChatbutton = document.querySelector(".chat-input i");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const body = document.querySelector("body");

chatbotToggler.addEventListener("click", () => {
  body.classList.toggle("show-chatbot");
});

let usermessage;

/* -----------------------------------
   Function to get full bot response
-------------------------------------*/
async function generateResponse(userMessage, loaderBubble) {
  const response = await fetch("https://mahad-usman-15.github.io/school-agent/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  const botReply = data.reply;

  // Replace loader with actual bot message
  loaderBubble.innerHTML = `
    <i class="fa-solid fa-robot"></i>
    <p>${botReply}</p>
  `;

  chatbox.scrollTop = chatbox.scrollHeight;
}

/* -----------------------------------
   Create chat bubble
-------------------------------------*/
const createChatli = (message, className) => {
  const chatli = document.createElement("li");
  chatli.classList.add("chat", className);

  if (className === "outgoing") {
    chatli.innerHTML = `<p>${message}</p>`;
  } else {
    // incoming loader
    chatli.innerHTML = `
      <i class="fa-solid fa-robot"></i>
      <div class="loader"></div>
    `;
  }
  return chatli;
};

/* -----------------------------------
   Handle user sending message
-------------------------------------*/
const handlechat = () => {
  usermessage = ChatInput.value.trim();
  if (!usermessage) return;

  // Add user message bubble
  chatbox.appendChild(createChatli(usermessage, "outgoing"));
  ChatInput.value = "";

  // Add bot loader bubble
  const loaderBubble = createChatli("", "incoming");
  chatbox.appendChild(loaderBubble);

  chatbox.scrollTop = chatbox.scrollHeight;

  // Get full bot reply
  generateResponse(usermessage, loaderBubble);
};

sendChatbutton.addEventListener("click", handlechat);

ChatInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handlechat();
  }
});
