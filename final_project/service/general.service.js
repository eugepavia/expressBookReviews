const express = require('express');
const books = require('../database/booksdb.js');
let users = require("../database/usersdb.js");
let isValid = require("./auth_users.service.js").isValid;



// Register new user
const registerUser = (username,password) => {
    console.log('Entered service');
    console.log('Users before = '+users);
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
    const result = books[isbn];
    if (result) {
        return ({status:200,message:null,data:result});
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
        
// Get book review based on ISBN
const getReview = (isbn) => {
    const result = books[isbn];
    if (result) {
        if (Object.keys(result.reviews).length > 0) {
            return ({status:200,message:null,data:result.reviews});
        } else {
            return ({status:200,message:'This book has no reviews yet',data:null});
        }
    } else {
        return ({status:404,message:'Book not found',data:null});
    }
};


module.exports = {
    registerUser,
    getBooks,
    getByIsbn,
    getByAuthor,
    getByTitle,
    getReview
}
