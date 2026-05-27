const authService = require('../service/auth_users.service.js');

const generalError = {status:500,message:'Ups, something went wrong'};

//Login for registered (authenticated) users
const loginUser = async (req,res) => {
    try {
        const username = req.body.username;
        const password  =req.body.password;

        let response = await authService.loginUser(username,password);
        
        // Store access token and username in session
        const accessToken = response.accessToken;
        req.session.authorization = {accessToken, username};

        return res.status(response.status).json({message:response.message});
    } catch (err) {
        return res.status(generalError.status).json({message:generalError.message});
    }
};

// Add or modify a book review (only one per book per user)
const addReview = async (req,res) => {
    try {
        const isbn = req.params.isbn;
        const username = req.session.authorization['username'];
        const review = req.body.review;

        let response = await authService.addReview(isbn,username,review);
        return res.status(response.status).json(response.data || {message:response.message});
    } catch (err) {
        return res.status(generalError.status).json({message:generalError.message});
    }    
};

// Delete a book review (only the corresponding to logged user)
const deleteReview = async (req,res) => {
    try {
        const isbn = req.params.isbn;
        const username = req.session.authorization['username'];

        let response = await authService.deleteReview(isbn,username);
        return res.status(response.status).json({message:response.message});
    } catch (err) {
        return res.status(generalError.status).json({message:generalError.message});
    } 
};


module.exports = {
    loginUser,
    addReview,
    deleteReview
};
