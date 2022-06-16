
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

const Recipe = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },

    data: {
        required: true,
        type: Object
    }
})

module.exports = {
    Trending: mongoose.model('trending', Trending),
    Recipe: mongoose.model('recipe', Recipe)
}