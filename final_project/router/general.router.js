const express = require('express');
const dotenv = require('dotenv').config();
let books = require("./booksdb.js");
let isValid = require("./auth_users.router.js").isValid;
let users = require("./auth_users.router.js").users;
let generalController = require('../controller/general.controller.js');
const public_users = express.Router();

let url = process.env.URL;

// Register new user
public_users.post('/register',generalController.registerUser);

// Get the book list available in the shop
public_users.get('/books',generalController.getBooks);

// Get book details based on ISBN (key considered as ISBN for demo purposes)
public_users.get('/isbn/:isbn',generalController.getByIsbn);
  
// Get book details based on author
public_users.get('/author/:author',generalController.getByAuthor);

// Get all books based on title
public_users.get('/title/:title',generalController.getByTitle);

// Get book review based on ISBN
public_users.get('/review/:isbn',generalController.getReview);

module.exports.general = public_users;
