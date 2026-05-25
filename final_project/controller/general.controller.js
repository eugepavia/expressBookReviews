const express = require('express');
const dotenv = require('dotenv').config();
let books = require("../router/booksdb.js");
let isValid = require("../router/auth_users.router.js").isValid;
let users = require("../router/auth_users.router.js").users;
let generalService = require("../service/general.service.js");

// Register new user
const registerUser = async (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        
        let response = await generalService.registerUser(username,password);
        return res.status(response.status).json({message:response.message});
    } catch (err) {
        return res.status(500).json({message:'Ups, something went wrong'});
    }
}

// Get the book list available in the shop
const getBooks = async (req,res) => {
    try {
        let response = await generalService.getBooks();
        return res.status(response.status).send(response.data);
    } catch (err) {
        return res.status(500).json({message:'Ups, something went wrong'});
    }
}

module.exports = {
    registerUser,
    getBooks
}