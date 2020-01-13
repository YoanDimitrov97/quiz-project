const router = require('express').Router();
const Quiz = require("../models/quiz.model");

router.route('/').get((req, res) => {
    Quiz.find()
    .then(quiz => res.json(quiz))
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/quiz/create').post((req,res) => {
    const title = req.body.title;
    const numOfQuestions = req.body.numOfQuestions;
    const questions = req.body.questions;
    const category = req.body.category;
    const rating = 0;
    const createdOn = new Date();
    const createdBy = "111";

    const newQuiz = new Quiz({
        title,
        numOfQuestions,
        questions,
        category,
        rating,
        createdOn,
        createdBy
    });

    newQuiz.pre('save', (next) => {
        Quiz.find({createdBy: "111"}, (err, docs) => {
            if(!docs.length){
                next();
            } else {
                console.log('Quiz exists');
                next(new Error("User exists!"));
            }
        })
        .then()
        .catch((err) => res.status(400).json(`Err ${err}`));
    })

    newQuiz.save()
    .then(() => res.json("Quiz Created Successfully"))
    .catch((err) => res.status(400).json(`Err ${err}`));
})

module.exports = router;