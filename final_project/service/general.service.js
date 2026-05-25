const express = require('express');
const books = require('../router/booksdb.js');
const dotenv = require('dotenv').config();
let isValid = require("../router/auth_users.router.js").isValid;
let users = require("../router/auth_users.router.js").users;

let url = process.env.URL;

// Register new user
const registerUser = (username,password) => {
    // In case of missing data
    if (!username || !password) {
        return ({status:400,message:'Missing username and/or password'});
    }

    // Check for valid username (if not repeated)
    if (isValid(username)) {
        users.push({
            'username': username,
            'password': password
        });
        return ({status:201,message:'User registered successfuly!'});
    } else {
        return ({status:409,message:'Username already exists'});
    }
}

// Get the book list available in the shop
const getBooks = () => {
    return ({status:200,data:books});
}

// Get book details based on ISBN (key considered as ISBN for demo purposes)
const getByIsbn = (isbn) => {
    if (books[isbn]) {
        return ({status:200,message:null,data:books[isbn]});
    } else {
        return ({status:404,message:'Book not found',data:null});
    }
}

// Get book details based on author
const getByAuthor = (author) => {
    let result = Object.values(books).filter((book)=>{
        return (book.author.toLowerCase().includes(author.toLowerCase()));
    })
    if (result.length > 0) {
        return ({status:200,message:null,data:result});
    } else {
        return ({status:404,message:'Author not found',data:null});
    }
}

// Get all books based on title
const getByTitle = (title) => {
    let result = Object.values(books).filter((book)=>{
        return (book.title.toLowerCase().includes(title.toLowerCase()));
    });
    if (result.length > 0) {
        return ({status:200,message:null,data:result});
    } else {
        return ({status:404,message:'Title not found',data:null});
    }
};
        

module.exports = {
    registerUser,
    getBooks,
    getByIsbn,
    getByAuthor,
    getByTitle
}
