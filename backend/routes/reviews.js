const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

router.get('/:id', (req, res) => {
    Review.find({release: req.params.id}, (err, reviews) => {
        if (err) {
            res.json(err)
        }

        if (reviews) {
            res.json(reviews)
        }
    }).populate('release').populate('user')
})

router.get('/find/:id', (req, res) => {
    Review.findOne({_id: req.params.id}, (err, reviews) => {
        if (err) {
            res.json(err)
        }

        if (reviews) {
            res.json(reviews)
        }
    }).populate('release').populate('user')
})

router.get('/',  (req, res) => {
    Review.find((err, review) => {
        res.json(review);
    }).sort({datePosted: 'desc'}).populate('release').populate('user')
})

router.post('/create/:id', async (req, res) => {

    // Check to see if user is logged in
    if (!req.session.user) {
        res.status(500).redirect('http://localhost:3000/login');
    }

    // Make your review
    const newReview = new Review({
        body: req.body.body,
        rating: req.body.rating,
        user: req.session.user,
        release: req.params.id
    })

    await newReview.save();
    res.redirect('http://localhost:3000');

})

router.put('/edit/:id', async (req, res) => {
    const editReview = await Review.findByIdAndUpdate(req.params.id, {
        body: req.body.body,
        rating: req.body.rating
    }, {new: true})

    res.redirect('http://localhost:3000');
    console.log(editReview);


})

router.delete('/delete/:id', (req, res) => {

    Review.findByIdAndDelete(req.params.id, (err, review) => {
        if (err) {
            console.log(err);
        }

        if (review) {
            console.log('deleted !')
        }
    });
    
})

module.exports = router;