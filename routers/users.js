const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User Model
const User = require('../Models/User');

//Login Page
router.get('/login', (req, res) => res.render("login"));

//Register Page
router.get('/register', (req, res) => res.render("register"));

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields!' });
    }

    //Check Passwords Match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match!' });
    }

    //Check Pass length
    if (password.length < 8) {
        errors.push({ msg: 'Please enter a password with length greater than 8!' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email })
            .then(User => {
                if (User) {
                    errors.push({ msg: 'Email already exists' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                }
            })
    }
});

module.exports = router;