const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const books = require('../database/booksdb.js');
const users = require('../database/usersdb.js');


let accessKey = process.env.ACCESS_KEY;

// Check if new username is valid. Returns boolean
const isValid = (username)=>{
    let user = users.filter((user)=>{
        return (user.username === username);
    });
    if (user.length > 0) {
        return false;
    } else {
        return true;
    }
}

// Check if user and password match the one in the records. Returns boolean
const authenticatedUser = (username,password)=>{
    let user = users.filter((user)=>{
        return (user.username === username && user.password === password);
    });
    if (user.length > 0) {
        return true;
    } else {
        return false;
    }
}

//Login for registered (authenticated) users
const loginUser = (username,password) => {
    // In case of missing data
    if (!username || !password) {
        return ({status:404,message:'Missing username and/or password'});
    }

    // In case of authenticated user
    if (authenticatedUser(username,password)) {
        // Create access token
        let accessToken = jwt.sign({data:password},accessKey,{expiresIn: 60 * 60});

        return ({
            status:200,
            message:'You are logged in!',
            accessToken:accessToken
        });

    } else {
        return ({status:401,message:'Invalid username and/or password'});
    }
}

// Add or modify a book review (only one per book per user)
const addReview = (isbn,username,review) => {
    let book = books[isbn]

    // Check if book is available
    if (book) {
        // Check if user entered a new review
        if (review) {
                book.reviews[username] = review;
                return ({status:201,data:book.reviews});
        } else {
            return ({status:400,message:'Missing review'});
        }
    } else {
        return ({status:404,message:'Book not found'});
    }
};

// Delete a book review (only the corresponding to logged user)
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization['username'];
    let book = books[isbn]

    // Check if book is available
    if (book) {
        // Check if user has a review to delete
        if (book.reviews[username]) {
                delete book.reviews[username]
                return res.status(200).json({message: "Review deleted!"});
        } else {
            return res.status(400).json({message: "There is no review to delete"});
        }
    } else {
        return res.status(404).json({message: "Book not found"});
    }
});

module.exports.isValid = isValid;