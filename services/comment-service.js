const CommentModel = require('../models/comments')
const VisitorModel = require('../models/visitors')

async function rating({ visitorId, commentId, value }) {
    const visitor = await VisitorModel.findOne({ _id: visitorId })
    const comment = await CommentModel.findOne({ _id: commentId })

    comment.voters.push(visitor)
    comment.rating = comment.rating + value

    await comment.save()
    return comment
}

async function findAll() {
    return CommentModel.find()
}

async function add(visitor) {
    return CommentModel.create(visitor)
}

async function del(_id) {
    return CommentModel.deleteOne({ _id })
}

async function find(_id) {
    return CommentModel.findOne({ _id })
}

module.exports = {
    rating,
    findAll,
    find,
    add,
    del
}