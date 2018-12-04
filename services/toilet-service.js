const ToiletModel = require('../models/toilet')

async function findAll() {
    return ToiletModel.find()
}

async function add(toilet) {
    return ToiletModel.create(toilet)
}

async function del(_id) {
    return ToiletModel.deleteOne({ _id })
}

async function find(_id) {
    return ToiletModel.findOne({ _id })
}

module.exports = {
    findAll,
    find,
    add,
    del
}