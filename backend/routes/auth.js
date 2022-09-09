const express = require('express');
const User = require('../models/User.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('AUTH PAGE :3 !!!!');
    console.log(req.user);
})

router.get('/currentuser', (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.json('no one is currently logged in')
    }
})

router.post('/signup', async (req, res) => {

    User.findOne({username: req.body.username}, (err, user) => {
        if (user) {
            return res.status(401).redirect('http://localhost:3000/signup');
        }
    })

    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            return res.status(400).redirect('http://localhost:3000/signup');
        }
    })

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    await newUser.save();
    req.session.user = newUser;
    

    res.redirect('http://localhost:3000');

})

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (!user) {
            return res.status(403).redirect('http://localhost:3000/login');
        } else {
            if (user.password !== req.body.password) {
                 return res.status(405).redirect('http://localhost:3000/login');
            }
        }

        if (user) {
            req.session.user = user;
            req.session.save();
            res.redirect('http://localhost:3000');
        }
    })
})

module.exports = router;