# Online Bookstore - Node.js & Express Application

This project is a back-end application for an online bookstore built using **Node.js** and **Express.js**. It provides a set of RESTful APIs to manage books, users, and reviews.

## Features
- **Public Access:** Retrieve book lists, search by ISBN, Title, or Author.
- **User Management:** Registration and Login system using JWT (JSON Web Tokens).
- **Reviews:** Registered users can add, modify, or delete book reviews.
- **Asynchronous Programming:** All public endpoints are implemented using **Promises** and **Async/Await**.

## Project Structure
- `index.js`: Main entry point and session configuration.
- `booksdb.js`: Contains the local JSON data for books.
- `customer/main/general.js`: Routes for general public access (Searching, Listing).
- `customer/main/auth_users.js`: Routes for authenticated users (Login, Reviews).

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone <your-repo-link>
