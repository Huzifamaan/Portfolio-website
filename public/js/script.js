document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Script Loaded!");

    // ✅ Fix Hamburger Menu (Mobile Navigation)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });

        // ✅ Close menu when clicking a link (on mobile)
        document.querySelectorAll("nav ul li a").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove("show");
                }
            });
        });
    } else {
        console.warn("⚠️ Hamburger menu elements not found.");
    }

    // ✅ Fix Chatbot Functionality (Only in `projects.html`)
    const chatIcon = document.getElementById("chat-icon");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbotButton = document.getElementById("close-chatbot");
    const chatbox = document.getElementById("chatbox");
    const chatInput = document.getElementById("chat-input");
    const sendChatButton = document.getElementById("send-chat");

    if (chatIcon && chatbotContainer && closeChatbotButton) {
        chatIcon.addEventListener("click", () => {
            chatbotContainer.classList.toggle("show-chatbot");
        });

        closeChatbotButton.addEventListener("click", () => {
            chatbotContainer.classList.remove("show-chatbot");
        });

        // ✅ Chatbot Messaging Function
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
                console.error("❌ Chatbot Error:", error);
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
    } else {
        console.warn("⚠️ Chatbot elements not found. Make sure they exist in `projects.html`.");
    }
});
