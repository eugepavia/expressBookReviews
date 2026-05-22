const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (isValid(username)) {
        users.push({
            'username': username,
            'password': password
        });
        return res.status(201).json({message:'User registered successfuly!'})
    } else {
        return res.status(404).json({message:'Username already exists'});
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(300).send(JSON.stringify(books));
});

// Get book details based on ISBN (key considered as ISBN for display purposes)
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let result = books[isbn]
    if (result) {
        return res.status(200).send(JSON.stringify(result));
    } else {
        return res.status(404).json({message: "Book not found"});
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let result = Object.values(books).filter((book)=>{
        return (book.author.toLocaleLowerCase().includes(author.toLocaleLowerCase()));
    });

    if (result.length > 0) {
        return res.status(200).send(JSON.stringify(result));
    } else {
        return res.status(404).json({message: "Author not found"});
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let result = Object.values(books).filter((book)=>{
        return (book.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    });

    if (result.length > 0) {
        return res.status(200).send(JSON.stringify(result));
    } else {
        return res.status(404).json({message: "Title not found"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
