const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
let books = require("./booksdb.js");
const regd_users = express.Router();

let accessKey = process.env.ACCESS_KEY;

let users = [];

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
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password  =req.body.password;

    // In case of missing data
    if (!username || !password) {
        return res.status(404).json({message: 'Missing username and/or password'})
    }

    // In case of authenticated user
    if (authenticatedUser(username,password)) {
        // Create access token
        let accessToken = jwt.sign({data:password},accessKey,{expiresIn: 60 * 60});

        // Store access token and username in session
        req.session.authorization = {accessToken, username}

        return res.status(200).json({message: 'You are logged in!'})
    } else {
        return res.status(401).json({message: 'Invalid username and/or password'})
    }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Modify book review

// Delete book review

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
