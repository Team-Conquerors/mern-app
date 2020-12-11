const router = require('express').Router()
let Sentiment = require('../models/sentiment.model')

// end point localhost:5000/
router.route('/').get((req, res) => {
    Sentiment.find()
        .then(sentiment => res.json(sentiment))
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router
