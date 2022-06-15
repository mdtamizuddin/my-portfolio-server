const {Schema} = require('mongoose')
const dateNow = require('../dateNow')()

const portfolioSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    description:{
        type: String,
        required: true
    },
    date :{
        type : String,
        default : dateNow
    }
})

module.exports = portfolioSchema