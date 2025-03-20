const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));  // ✅ Serve all static files (CSS, JS, Images)

// ✅ Serve Pages Dynamically
const pages = ["index", "about", "projects", "contact", "resume", "blog"];
pages.forEach(page => {
    app.get(`/${page === "index" ? "" : page}`, (req, res) =>
        res.sendFile(path.join(__dirname, "views", `${page}.html`))
    );
});

// ✅ Handle Contact Form Submission
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`📩 New message from ${name} (${email}): ${message}`);
    res.json({ message: "Thank you for reaching out! I'll get back to you soon." });
});

// ✅ AI Chatbot API Route (Using OpenAI)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 100
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("❌ OpenAI API Error:", error);
        res.status(500).json({ reply: "Sorry, I can't respond right now." });
    }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🔥 Server running at http://localhost:${PORT}`));
