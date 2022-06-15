const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const priceSchema = new mongoose.Schema({
    type :{
        type: String,
        required : true
    },
    price :{
        type: Number,
        required : true
    },
    services:{
        type: Array,
        required: true
    }
})
const YearlyPricing = new mongoose.model('YearlyPricing',priceSchema)

router.get('/', (req, res) => {
    YearlyPricing.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem On Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})
router.get('/:id', (req, res) => {
    YearlyPricing.findOne({ '_id': req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json(data)
        }
    })
})

router.post('/', (req, res) => {
    const newPortfolio = new YearlyPricing(req.body)
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
    const pricing = req.body
    YearlyPricing.updateOne({ '_id': req.params.id }, {
        $set: {
            type: pricing.type,
            price: pricing.price,
            services: pricing.services
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
    YearlyPricing.deleteOne({ '_id': req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ message: "There is A Problem on Server" })
        }
        else {
            res.status(200).json({ message: "data deleted" })
        }
    })
})

module.exports = router