const mongoose = require('mongoose')

const VisitorSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Visitor', VisitorSchema)