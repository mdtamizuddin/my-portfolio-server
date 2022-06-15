const { Schema } = require('mongoose')
const dateNow = require('../dateNow')()

const portfolioSchema = new Schema({
    details: {
        type: Object,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: String,
       required: true
    }
})

module.exports = portfolioSchema