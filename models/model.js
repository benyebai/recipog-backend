
const mongoose = require('mongoose');

const Trending = new mongoose.Schema({
    date: {
        required: true,
        type: String
    },

    data: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('trending', Trending)