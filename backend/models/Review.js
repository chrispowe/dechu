const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const reviewSchema = new Schema({
    body: {
        require: true,
        type: String
    },
    rating: {
        require: true,
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    release: {
        type: Schema.Types.ObjectId,
        ref: 'Discog'
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Review', reviewSchema);