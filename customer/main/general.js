const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 10: Get all books using Async/Await
public_users.get('/', async function (req, res) {
  try {
    // في الواقع العملي بننادي API، هنا هنرجع الـ local booksdb كـ simulation
    const getBooks = () => Promise.resolve(books); 
    const allBooks = await getBooks();
    res.status(200).send(JSON.stringify(allBooks, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error fetching books"});
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const findBook = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  findBook
    .then((book) => res.status(200).send(JSON.stringify(book, null, 4)))
    .catch((err) => res.status(404).json({message: err}));
});

// Task 12 & 13: Search by Author or Title (Example: Author)
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const getAuthorBooks = new Promise((resolve) => {
    let filteredBooks = Object.values(books).filter(b => b.author === author);
    resolve(filteredBooks);
  });

  getAuthorBooks.then((result) => res.status(200).send(JSON.stringify(result, null, 4)));
});
