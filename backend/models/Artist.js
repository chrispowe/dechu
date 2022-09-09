const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const artistSchema = new Schema({
    type: {
        require: true,
        type: String
    },
    name: {
        require: true,
        type: String
    },
    discography: {
        type: Schema.Types.ObjectId,
        ref: 'Discog'
    },
    genre: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: false
    }

})

module.exports = mongoose.model('Artist', artistSchema);