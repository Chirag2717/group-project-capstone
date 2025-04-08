const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Sample book list
let books = [
  { title: "Cloud Computing Fundamentals", author: "Durham Faculty" },
  { title: "AWS Essentials", author: "John Doe" },
  { title: "Azure for Students", author: "Jane Smith" },
  { title: "DevOps with Cloud", author: "Prof. A. Kumar" }
];

// Simulated users
const users = [
  { username: "admin", password: "admin123" },
  { username: "chirag", password: "chirag123" },
  { username: "kamal", password: "kamal123" },
  { username: "kunal", password: "kunal123" }
];

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Get books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Add book
app.post("/api/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Missing title or author" });
  }
  books.push({ title, author });
  res.status(201).json({ message: "Book added" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
