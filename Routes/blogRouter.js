const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const portfolioSchema = require('../Schemas/portfolioSchema')
const Blog = new mongoose.model('Blog', portfolioSchema)

router.get('/', (req, res) => {
    Blog.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem On Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.get('/:id', (req, res) => {
    Blog.findOne({ '_id': req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.post('/', (req, res) => {
    const newPortfolio = new Blog(req.body)
    newPortfolio.save((err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json({ message: "data inserted success" })
        }
    })
})

router.put('/:id', (req, res) => {
    const portfolio = req.body
    Blog.updateOne({ '_id': req.params.id }, {
        $set: {
            image: portfolio.image
        }
    }, (err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json({ message: 'data update success' })
        }
    })
})

router.delete('/:id', (req, res) => {
    Blog.deleteOne({ '_id': req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json({ message: "data deleted" })
        }
    })
})

module.exports = router