const express = require('express');
const Blog = require("../models/Blog");
const {requireAuth} = require("../middlewares/authMiddleware");
const Subscriber = require("../models/Subscriber");
const router = express.Router();


router.post('/subscribe', requireAuth, async function (req, res, next) {
    try {
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({message: 'გთხოვთ მიუთითოთ იმეილი.'});
        }

        const existingSubscriber = await Subscriber.findOne({email});
        if (existingSubscriber) {
            return res.status(400).json({message: 'ეს მეილი უკვე რეგისტრირებულია!'})
        }

        const newSubscriber = new Subscriber({email});
        await newSubscriber.save();

        console.log(`ახალი გამომწერის იმეილი მიღებულია: ${email}`);
        return res.status(200).json({message: 'წარმატებით გამოიწერეთ!'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'სერვერზე მოხდა შეცდომა.'});
    }
})

router.get('/:id', requireAuth, async function (req, res, next) {
    try {
        const email = req.session.user.email;
        const {id} = req.params;

        const recentBlogs = await Blog.find({_id: {$ne: id}}).sort({date: -1}).limit(10).populate('author', 'email');

        const blog = await Blog.findById(id).populate('author', 'email');

        if (!blog) {
            return res.status(404).send('ბლოგი ვერ მოიძებნა.');
        }

        res.render('blog', {email, recentBlogs, blog});
    } catch (err) {
        res.status(500).send("გვერდის ჩატვირთვისას მოხდა შეცდომა.");
    }
});


module.exports = router;
