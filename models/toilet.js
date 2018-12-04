const mongoose = require('mongoose')

const ToiletSchema = new mongoose.Schema({
    name: String,
    location: String
})

module.exports = mongoose.model('Toilet', ToiletSchema);