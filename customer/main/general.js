const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// عنوان API الداخلي (افترض أن السيرفر يعمل على المنفذ 5000)
const BASE_URL = 'http://localhost:5000';

// دالة مساعدة لجلب جميع الكتب باستخدام axios (يمكن استخدامها داخليًا)
async function fetchAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books from API');
    }
}

// Task 10: Get the list of books available in the shop using Axios with Promises
public_users.get('/', function (req, res) {
    axios.get(`${BASE_URL}/books`)  // افتراض وجود endpoint آخر لجلب الكتب، أو نفس المسار
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json({ message: "Error fetching books", error: error.message });
        });
});

// Task 11: Get book details based on ISBN using Axios with Promises
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    axios.get(`${BASE_URL}/books/${isbn}`)  // افتراض وجود endpoint مثل /books/:isbn
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                res.status(404).json({ message: "Book not found" });
            } else {
                res.status(500).json({ message: "Error fetching book", error: error.message });
            }
        });
});

// Task 12: Get book details based on author using Async/Await with Axios
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        // جلب جميع الكتب أولاً باستخدام axios
        const response = await axios.get(`${BASE_URL}/books`);
        const booksList = response.data;
        // تصفية الكتب حسب المؤلف (البيانات قد تكون مصفوفة أو كائن)
        let filteredBooks;
        if (Array.isArray(booksList)) {
            filteredBooks = booksList.filter(book => book.author === author);
        } else {
            // إذا كانت البيانات كائنًا مفهرسًا بـ ISBN
            filteredBooks = Object.values(booksList).filter(book => book.author === author);
        }
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "Author not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Task 13: Get book details based on title using Async/Await with Axios
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        const booksList = response.data;
        let filteredBooks;
        if (Array.isArray(booksList)) {
            filteredBooks = booksList.filter(book => book.title === title);
        } else {
            filteredBooks = Object.values(booksList).filter(book => book.title === title);
        }
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "Title not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports.general = public_users;
