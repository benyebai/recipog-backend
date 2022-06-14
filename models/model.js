const { json } = require('express/lib/response');
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    data: {
        required: true,
        type: Object
    }
})

module.exports = mongoose.model('recipe-data', dataSchema)