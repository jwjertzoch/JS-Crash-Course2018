const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    toilet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Toilet',
        required: true
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor'
    }]
})

module.exports = mongoose.model('Comment', CommentSchema);