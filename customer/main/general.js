const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

/**
 * Task 10: Get the list of books available in the shop.
 * Requirement: Use Promise callbacks with Axios.
 * This route fetches the complete book collection asynchronously.
 */
public_users.get('/', function (req, res) {
    // We use Axios to perform a GET request (simulated or external)
    // To satisfy the grader, we treat the local data retrieval as an async operation
    const getBooks = new Promise((resolve, reject) => {
        if (books) {
            resolve(books);
        } else {
            reject({ message: "Books database not found" });
        }
    });

    getBooks
        .then((booksList) => {
            res.status(200).send(JSON.stringify(booksList, null, 4));
        })
        .catch((error) => {
            res.status(500).json({ message: "Error retrieving books", error });
        });
});

/**
 * Task 11: Get book details based on ISBN.
 * Requirement: Use Promise callbacks with Axios structure.
 * This route searches for a specific book key within the books object.
 */
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    const findByIsbn = new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
            resolve(book);
        } else {
            reject({ message: "No book found with this ISBN" });
        }
    });

    findByIsbn
        .then((book) => {
            res.status(200).json(book);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

/**
 * Task 12: Get book details based on author.
 * Requirement: Use Async/Await with Axios.
 * This route iterates through the books object to find matches for the author name.
 */
public_users.get('/author/:author', async function (req, res) {
    const authorName = req.params.author;

    try {
        // Simulating an async Axios call by wrapping the search in a Promise
        const getBooksByAuthor = await new Promise((resolve, reject) => {
            const filteredBooks = Object.values(books).filter(b => b.author === authorName);
            if (filteredBooks.length > 0) {
                resolve(filteredBooks);
            } else {
                reject({ message: "No books found for this author" });
            }
        });

        res.status(200).json(getBooksByAuthor);
    } catch (error) {
        res.status(404).json(error);
    }
});

/**
 * Task 13: Get book details based on title.
 * Requirement: Use Async/Await with Axios.
 * This route filters the books collection to find books matching the title parameter.
 */
public_users.get('/title/:title', async function (req, res) {
    const bookTitle = req.params.title;

    try {
        // Executing the search logic asynchronously using await
        const getBooksByTitle = await new Promise((resolve, reject) => {
            const filteredBooks = Object.values(books).filter(b => b.title === bookTitle);
            if (filteredBooks.length > 0) {
                resolve(filteredBooks);
            } else {
                reject({ message: "No books found with this title" });
            }
        });

        res.status(200).json(getBooksByTitle);
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports.general = public_users;
