const express = require('express');
const Artist = require('../models/Artist.js');

const router = express.Router();

router.get('/', (req, res) => {
    Artist.find((err, artist) => {
        res.json(artist);
    })
})

router.get('/:id', (req, res) => {

    //Grab certain Artist info
    Artist.findOne({_id: req.params.id}, (err,artist) => {
        if (err) {
            res.send(err)
        }

        if (!artist) {
            return res.status(400).send('artist does not exist');
        } else {
            res.json(artist);
        }
    })

})

router.post('/add', (req, res) => {

    //Model for Artist
    const newArtist = new Artist({
        type: req.body.type,
        name: req.body.name,
        genre: req.body.genre,
        dateOfBirth: req.body.dateOfBirth
    })

    //Check to see if artist is already in the datebase
    Artist.findOne({name: req.body.name}, async(err, user) => {
        if (user) {
            return res.status(404).send('artist alrady exists !');
        } else {
            await newArtist.save();
            res.redirect(`http://localhost:3000/artist/${newArtist._id}`);
        }
    })
})


module.exports = router;