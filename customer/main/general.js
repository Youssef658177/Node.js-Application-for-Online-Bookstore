const express = require('express');
let books = require("./booksdb.js");

const public_users = express.Router();

/* =========================
   Task 10: Get all books (Promise)
========================= */
public_users.get('/', function (req, res) {

    const getBooks = new Promise((resolve, reject) => {
        resolve(books);
    });

    getBooks
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving books" });
        });
});


/* =========================
   Task 11: Get book by ISBN (Promise)
========================= */
public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    const getBook = new Promise((resolve, reject) => {
        const book = books[isbn];

        if (book) {
            resolve(book);
        } else {
            reject("Book not found");
        }
    });

    getBook
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json({ message: err });
        });
});


/* =========================
   Task 12: Get books by author (async/await)
========================= */
public_users.get('/author/:author', async function (req, res) {

    const author = req.params.author;

    const booksList = Object.values(books);

    const filteredBooks = booksList.filter(
        book => book.author === author
    );

    if (filteredBooks.length > 0) {
        return res.status(200).json(filteredBooks);
    } else {
        return res.status(404).json({ message: "Author not found" });
    }
});


/* =========================
   Task 13: Get books by title (async/await)
========================= */
public_users.get('/title/:title', async function (req, res) {

    const title = req.params.title;

    const booksList = Object.values(books);

    const filteredBooks = booksList.filter(
        book => book.title === title
    );

    if (filteredBooks.length > 0) {
        return res.status(200).json(filteredBooks);
    } else {
        return res.status(404).json({ message: "Title not found" });
    }
});

module.exports.general = public_users;
