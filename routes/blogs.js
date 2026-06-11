const express = require('express');
const router = express.Router();
const path = require('path');
const Blog = require('../models/Blog');
const User = require('../models/User');
const {requireAuth} = require('../middlewares/authMiddleware');


router.get('/new', requireAuth, function (req, res, next) {
    const email = req.session.user.email;
    res.render('new-post', {email});
})

router.post('/create', requireAuth, async function (req, res, next) {
    try {
        const {title, description, message} = req.body;
        const {email} = req.session.user;
        const author = await User.findOne({email}, 'email');
        const authorId = author._id.toString();

        const newBlog = new Blog({
            title,
            description,
            message,
            author: authorId,
        })

        await newBlog.save();

        res.redirect('/blogs');
    } catch (err) {
        console.log(err);
        res.status(500).send('პოსტის შენახვისას მოხდა შეცდომა.')
    }
})


module.exports = router;