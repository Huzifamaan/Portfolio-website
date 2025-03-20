document.addEventListener("DOMContentLoaded", () => {
    const chatIcon = document.getElementById("chat-icon");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbotButton = document.getElementById("close-chatbot");
    const chatbox = document.getElementById("chatbox");
    const chatInput = document.getElementById("chat-input");
    const sendChatButton = document.getElementById("send-chat");

    // ✅ Open/Close Chatbot
    chatIcon.addEventListener("click", () => {
        chatbotContainer.classList.toggle("show-chatbot");
    });

    closeChatbotButton.addEventListener("click", () => {
        chatbotContainer.classList.remove("show-chatbot");
    });

    // ✅ Send Message to Chatbot
    function sendMessage() {
        const userInput = chatInput.value.trim();
        if (!userInput) return;

        chatbox.innerHTML += `<p class="user-message"><strong>You:</strong> ${userInput}</p>`;
        chatInput.value = "";

        fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            chatbox.innerHTML += `<p class="ai-message"><strong>AI:</strong> ${data.reply}</p>`;
            chatbox.scrollTop = chatbox.scrollHeight;
        })
        .catch(error => {
            console.error("Chatbot Error:", error);
            chatbox.innerHTML += `<p class="ai-message"><strong>AI:</strong> Sorry, something went wrong.</p>`;
        });
    }

    sendChatButton.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});
