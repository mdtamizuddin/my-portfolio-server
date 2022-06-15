const {Schema} = require('mongoose')
const dateNow = require('../dateNow')()

const headersSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    date :{
        type : String,
        default : dateNow
    }
})

module.exports = headersSchema