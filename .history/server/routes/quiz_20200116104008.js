const router = require('express').Router();
const path = require('path');
const Quiz = require("../models/quiz.model");
const sessionCheck = require('../../middleware/sessionCheck');

router.route('/').get(sessionCheck, (req, res) => {
    // Quiz.find()
    // .then(quiz => console.log(quiz))
    // .catch(err => res.status(400).json('Error' + err));
})

router.route('/quiz/create').post((req,res) => {
    const title = req.body.title;
    const numOfQuestions = req.body.numOfQuestions;
    const questions = req.body.questions;
    const category = req.body.category;
    const rating = 0;
    const createdOn = new Date();
    const createdBy = req.body.createdBy;

    const newQuiz = new Quiz({
        title,
        numOfQuestions,
        questions,
        category,
        rating,
        createdOn,
        createdBy
    });

    Quiz.find({createdBy: createdBy})
    .then(docs => {
        if(!docs.length){
            newQuiz.save()
            .then(() => res.json("Quiz Created Successfully"))
            .catch((err) => res.status(400).json(`Err ${err}`));
        } else {
            Quiz.findOneAndReplace({createdBy: createdBy}, newQuiz, {new: true})
            .then(() => res.json("Quiz Updated!"))
            .catch((err) => res.status(400).json(`Err ${err}`));
        }
    })
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;