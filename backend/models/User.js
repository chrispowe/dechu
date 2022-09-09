const mongoose = require('mongoose');
const {Schema} = require('mongoose')


const userSchema = new Schema({
    username: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);