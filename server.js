const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//  Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

//  Serve Pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/projects", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "projects.html"));
});
app.get("/resume", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "resume.html"));
});

app.get("/blog", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "blog.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.use((req, res, next) => {
    res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
    console.log(`🔥 Server running at http://localhost:${PORT}`);
});
