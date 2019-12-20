const router = require('express').Router();
const path = require('path');
const Quiz = require("../models/quiz.model");
const sessionCheck = require('../../middleware/sessionCheck');

router.route('/').get(sessionCheck, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
    Quiz.find()
    .then(quiz => console.log(quiz))
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;