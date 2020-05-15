const router = require('express').Router();
const path = require('path');
const Quiz = require("../models/quiz.model");
const sessionCheck = require('../../middleware/sessionCheck');

router.route('/').get(sessionCheck, (req, res) => {
    // Quiz.find()
    // .then(quiz => console.log(quiz))
    // .catch(err => res.status(400).json('Error' + err));
})

router.route('/quiz').get((req,res) => {
    Quiz.find({createdBy:req.body.id})
    .then(doc => res.json(doc))
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/specific_quiz').get((req,res) => {
    console.log(`ello ${req.body.id}`)
    Quiz.findOne({_id:req.body.id})
    .then(doc => res.json(doc))
    .catch(err => res.status(400).json('Error' + err));
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
            Quiz.updateOne({createdBy: createdBy}, {
                title: title,
                numOfQuestions:numOfQuestions,
                questions:questions,
                category:category,
                rating:rating,
                createdOn:createdOn,
                createdBy:createdBy,
            }, {new: true})
            .then(() => res.json("Quiz Updated!"))
            .catch((err) => res.status(400).json(`Err ${err}`));
        }
    })
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;