const router = require('express').Router();
const Quiz = require("../models/quiz.model");

router.route('/').get((req, res) => {
    Quiz.find()
    .then(quiz => res.json(quiz))
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;