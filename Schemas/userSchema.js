const { Schema } = require('mongoose')
const dateNow = require('../dateNow')()

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photoURL: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "am-public"
    },
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = userSchema