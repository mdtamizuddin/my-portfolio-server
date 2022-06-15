const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const userSchema = require('../Schemas/userSchema')
const User = new mongoose.model('User', userSchema)
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem On Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.get('/:email', (req, res) => {
    User.findOne({ email: req.params.email }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.put('/admin/:email', async (req, res) => {
    const email = req.params.email
    User.updateOne({ email: email }, {
        $set: {
            role : "admin"
        }
    }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: "Data was Updated" })
        }
    })
})

router.put('/admin-r/:email', async (req, res) => {
    const email = req.params.email
    User.updateOne({ email: email }, {
        $set: {
            role : "am-public"
        }
    }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: "Data was Updated" })
        }
    })
})

router.put('/:email', (req, res) => {
    const email = req.params.email
    const newUser = new User(req.body)
    User.findOne({ email: req.params.email }, (err, data) => {
        if (data) {
            const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
            res.status(200).send({ message: "user Alrady Available", token: token })
        }
        else {
            newUser.save((err , data) => {
                if (err) {
                    res.status(500).json({ message: "There is A Problem on Server" , err })
                }
                else {
                    const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN)
                    res.status(200).json({ message: "New User Added", token: token })
                }
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    User.deleteOne({ '_id': req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json({ message: "data deleted" })
        }
    })
})

module.exports = router