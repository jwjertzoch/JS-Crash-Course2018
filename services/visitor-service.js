const VisitorModel = require('../models/visitor')

async function findAll() {
    return VisitorModel.find()
}

async function add(visitor) {
    return VisitorModel.create(visitor)
}

async function del(_id) {
    return VisitorModel.deleteOne({ _id })
}

async function find(_id) {
    return VisitorModel.findOne({ _id })
}

module.exports = {
    findAll,
    find,
    add,
    del
}