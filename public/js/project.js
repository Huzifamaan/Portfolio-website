document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.querySelector(".project-gallery");

    // ✅ Fetch projects from the JSON file
    fetch("data/projects.json")
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("project");

                // ✅ Insert project data dynamically
                projectElement.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="btn">View Project</a>
                `;

                projectContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.querySelector(".project-gallery");

    fetch("data/projects.json")
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("project");

                if (project.chatbot) {
                    // ✅ If it's a chatbot, embed it inside the project card
                    projectElement.innerHTML = `
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <button class="btn" id="open-chatbot">Open Chatbot</button>
                        <div id="chatbot-container" class="hidden">
                            <div class="chatbot-header">
                                <span>AI Chatbot</span>
                                <button id="close-chatbot">✖</button>
                            </div>
                            <div class="chatbox" id="chatbox"></div>
                            <input type="text" id="chat-input" placeholder="Ask me anything...">
                            <button id="send-chat">Send</button>
                        </div>
                    `;
                } else {
                    // ✅ Regular Project (No chatbot)
                    projectElement.innerHTML = `
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" target="_blank" class="btn">View Project</a>
                    `;
                }

                projectContainer.appendChild(projectElement);
            });

            // ✅ Chatbot Functionality
            const chatButton = document.getElementById("open-chatbot");
            const chatbotContainer = document.getElementById("chatbot-container");
            const closeChatbotButton = document.getElementById("close-chatbot");
            const sendChatButton = document.getElementById("send-chat");
            const chatInput = document.getElementById("chat-input");
            const chatbox = document.getElementById("chatbox");

            if (chatButton) {
                chatButton.addEventListener("click", () => {
                    chatbotContainer.classList.remove("hidden");
                });

                closeChatbotButton.addEventListener("click", () => {
                    chatbotContainer.classList.add("hidden");
                });

                sendChatButton.addEventListener("click", sendMessage);
                chatInput.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        sendMessage();
                    }
                });

                function sendMessage() {
                    const userMessage = chatInput.value.trim();
                    if (!userMessage) return;

                    chatbox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
                    chatInput.value = "";

                    fetch("/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: userMessage })
                    })
                    .then(response => response.json())
                    .then(data => {
                        chatbox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
                        chatbox.scrollTop = chatbox.scrollHeight;
                    })
                    .catch(error => {
                        console.error("Chatbot Error:", error);
                        chatbox.innerHTML += `<p><strong>AI:</strong> Sorry, something went wrong.</p>`;
                    });
                }
            }
        })
        .catch(error => console.error("Error loading projects:", error));
});
