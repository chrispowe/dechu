const express = require('express');
const Discog = require('../models/Discog.js');

const router = express.Router();

// This will find the discography of an artist
router.get('/:id', (req, res) => {
    Discog.find({artist: req.params.id}, (err, discog) => {

        res.json(discog);
    })
})

// This will find the information of a certain release
router.get('/findalbum/:id', (req, res) => {
    Discog.findOne({_id: req.params.id}, (err, album) => {
        if (err) {
            res.json(err);
        }

        if (album) {
            res.json(album)
        }
    })
})

// This will let the user add another release to another artists discography
router.post('/add/:id', (req, res) => {

    // Model for release
    const newRelease = new Discog({
        recordType: req.body.recordType,
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        artist: req.params.id,
        reviews: req.body.reviews,
        genre: req.body.genre
    })

    //Search to check it release already exists
    Discog.findOne({title: req.body.title}, async (err, release) => {

        if (release) {
            return res.status(404).send('release already exists !');
        } else {
            await newRelease.save();
            res.redirect(`http://localhost:3000`)
        }
    })
})


module.exports = router;