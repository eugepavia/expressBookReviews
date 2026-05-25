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
public_users.get('/author/:author',async function (req, res) {
    try {
        const author = req.params.author;
        const response = await Promise.resolve(
            Object.values(books).filter((book)=>{
                return (book.author.toLowerCase().includes(author.toLocaleLowerCase()));
            })
        );
        if (response.length > 0) {
            return res.status(200).send(JSON.stringify(response));
        } else {
            return res.status(404).json({message: "Author not found"});
        }
    } catch (err) {
        return res.status(500).json({message:'Ups, something went wrong'});
    }    
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    try {
        const title = req.params.title;
        const response = await Promise.resolve(
            Object.values(books).filter((book)=>{
                return (book.title.toLowerCase().includes(title.toLowerCase()));
            })
        );
        if (response.length > 0) {
            return res.status(200).send(JSON.stringify(response));
        } else {
            return res.status(404).json({message: "Title not found"});
        }
    } catch (err) {
        return res.status(500).json({message:'Ups, something went wrong'});
    }   
});

// Get book review based on ISBN
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let result = books[isbn]
    if (result) {
        return res.status(200).send(JSON.stringify(result.reviews));
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});

module.exports.general = public_users;
