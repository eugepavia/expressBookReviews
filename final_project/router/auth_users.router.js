const express = require('express');
const authController = require('../controller/auth_users.controller.js');
const regd_users = express.Router();

//Login for registered (authenticated) users
regd_users.post('/login', authController.loginUser);

// Add or modify a book review (only one per book per user)
regd_users.put('/auth/review/:isbn', authController.addReview);

// Delete a book review (only the corresponding to logged user)
regd_users.delete('/auth/review/:isbn', authController.deleteReview);

module.exports.authenticated = regd_users;