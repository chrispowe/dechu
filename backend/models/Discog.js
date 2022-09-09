const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const discogSchema = new Schema({
    recordType: {
        require: true,
        type: String
    },
    title: {
        require: true,
        type: String
    },
    releaseDate: {
        require: false,
        type: Date
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    genre: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('Discog', discogSchema);