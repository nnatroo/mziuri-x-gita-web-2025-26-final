const express = require('express');
const res = require("express/lib/response");
const router = express.Router();


router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    res.render('register');
})
module.exports = router;
