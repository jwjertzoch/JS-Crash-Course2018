const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    title: String,
    description: String,
    rating: {
        type: Number,
        default: 0
    },
    toilet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Toilet'
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor'
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor'
    }]
})

module.exports = mongoose.model('Comment', CommentSchema);