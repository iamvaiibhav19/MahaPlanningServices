const express = require('express');

const {
    registerUser,
    loginUser,
} = require('../controllers/userController');

const router = express.Router();

// register a user
router.route('/register').post(registerUser);

// login user 
router.route('/login').post(loginUser);

module.exports = router;


