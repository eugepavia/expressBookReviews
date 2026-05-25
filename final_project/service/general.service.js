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

module.exports = {
    registerUser,
    getBooks
}
