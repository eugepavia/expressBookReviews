const express = require('express');
const dotenv = require('dotenv').config();
let books = require("../router/booksdb.js");
let isValid = require("../router/auth_users.router.js").isValid;
let users = require("../router/auth_users.router.js").users;
let generalService = require("../service/general.service.js");

const generalError = {status:500,message:'Ups, something went wrong'};

// Register new user
const registerUser = async (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        let response = await generalService.registerUser(username,password);
        return res.status(response.status).json({message:response.message});
    } catch (err) {
        return res.status(generalError.status).json({message:generalError.message});
    }
}

// Get the book list available in the shop
const getBooks = async (req,res) => {
    try {
        let response = await generalService.getBooks();
        return res.status(response.status).send(response.data);
    } catch (err) {
        return res.status(generalError.status).json({message:generalError.message});
    }
}

// Get book details based on ISBN (key considered as ISBN for demo purposes)
 const getByIsbn = async (req,res) => {
    try {
        const isbn = req.params.isbn;
        let response = await generalService.getByIsbn(isbn);
        return res.status(response.status).json(response.data || {message:response.message});
    } catch (err) {
        return res.status(generalError.status).json({message:generalError.message});
    }
 }

 // Get book details based on author
 const getByAuthor = async (req,res) => {
    try {
        const author = req.params.author;
        const response = await generalService.getByAuthor(author);
        return res.status(response.status).json(response.data || {message:response.message});
    } catch (err) {
        return res.status(generalError.status).json({message:generalError.message});
    }
 }



module.exports = {
    registerUser,
    getBooks,
    getByIsbn,
    getByAuthor
}