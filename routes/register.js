const express = require('express');
const res = require("express/lib/response");
const router = express.Router();
const User = require('../models/User');


router.get('/', function (req, res, next) {
    res.render('register', {message: ""});
});

router.post('/', async (req, res) => {
    const {email, password, confirmPassword} = req.body;

    if (password.length < 8) {
        return res.render('register', {message: 'Password must be at least 8 characters'});
    }

    if (password !== confirmPassword) {
        return res.render('register', {message: 'Password must match confirm password'});
    }
    try {
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.render('register', {message: "User with this email already registered"});
        }

        const newUser = new User({
            email,
            password
        });

        await newUser.save();
        req.session.user = {email};

        res.redirect("/blogs");
    } catch (err) {
        console.log(err);
    }


})
module.exports = router;
