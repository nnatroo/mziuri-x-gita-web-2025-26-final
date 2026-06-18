const express = require('express');
const router = express.Router();
const path = require('path');
const Blog = require('../models/Blog');
const User = require('../models/User');
const {requireAuth} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.get('/', requireAuth, async function (req, res, next) {
    try {
        const email = req.session.user.email;

        const blogs = await Blog.find().sort({createdAt: -1}).populate('author', 'email');
        console.log(blogs);
        res.render('blogs', {email, blogs});
    } catch (err) {
        console.log(err);
        res.status(500).send('ბლოგების წამოღებისას მოხდა შეცდომა, გთხოვთ სცადოთ თავიდან.');
    }
});

router.get('/new', requireAuth, function (req, res, next) {
    const email = req.session.user.email;
    res.render('new-post', {email});
})

router.post('/new', requireAuth, upload.single('thumbnail'), async function (req, res, next) {
    try {
        const {title, description, message} = req.body;
        const {email} = req.session.user;
        const author = await User.findOne({email}, 'email');
        const authorId = author._id.toString();

        const blogData = {
            title,
            description,
            message,
            author: authorId,
        };

        if (req.file) {
            blogData.imageUrl = '/images/uploads/' + req.file.filename;
        }

        const newBlog = new Blog(blogData);

        await newBlog.save();

        res.redirect('/blogs');
    } catch (err) {
        console.log(err);
        res.status(500).send('პოსტის შენახვისას მოხდა შეცდომა.')
    }
})


module.exports = router;