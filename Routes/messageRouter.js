const express = require('express')
const mongoose = require('mongoose')
const dateNow = require('../dateNow')
const router = express.Router()
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: dateNow()
    }
})
const Message = new mongoose.model('Message', messageSchema)

router.get('/', (req, res) => {
    Message.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem On Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.get('/:id', (req, res) => {
    Message.findOne({ '_id': req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.post('/', (req, res) => {
    const newMessage = new Message(req.body)
    console.log(newMessage);
    newMessage.save((err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" , err })
        }
        else {
            res.status(200).json({ message: "data inserted success" })
        }
    })
})


router.delete('/:id', (req, res) => {
    Message.deleteOne({ '_id': req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json({ message: "data deleted" })
        }
    })
})

module.exports = router