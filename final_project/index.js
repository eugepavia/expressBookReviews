const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const dotenv = require('dotenv').config();
const customer_routes = require('./router/auth_users.router.js').authenticated;
const genl_routes = require('./router/general.router.js').general;

const app = express();

let accessKey = process.env.ACCESS_KEY;
let sessionKey = process.env.SESSION_KEY;
let port = process.env.PORT;

app.use(express.json());

app.use("/customer",session({secret: sessionKey,resave: true, saveUninitialized: true}))

// Authenticate user based on access token
app.use("/customer/auth/*", function auth(req,res,next){
    // Checks if user is logged in (session info)
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];
        // Checks valid token
        jwt.verify(token,accessKey,(err,user)=>{
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({message:'User not authenticated'});
            }
        })
    } else {
        return res.status(401).json({message:'User not logged in'})
    }
});
 

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(port,()=>console.log("Server is running"));
