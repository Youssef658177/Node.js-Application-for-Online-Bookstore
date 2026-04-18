const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Task 6: Register
regd_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (users.find(u => u.username === username)) {
      return res.status(404).json({message: "User already exists!"});
    }
    users.push({"username": username, "password": password});
    return res.status(200).json({message: "User successfully registered. Now you can login"});
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Task 7: Login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(404).json({message: "Error logging in"});

  // التحقق من اليوزر (بسيط للأغراض التعليمية)
  let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });
  req.session.authorization = { accessToken, username };
  return res.status(200).send("User successfully logged in");
});

// Task 8: Add/Modify Review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    return res.status(200).json({message: "Review added/updated successfully"});
  }
  return res.status(404).json({message: "Book not found"});
});
