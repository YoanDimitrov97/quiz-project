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
    const createdBy = "5dea39f9bfd33a330cd9692b";

    const newQuiz = new Quiz({
        title,
        numOfQuestions,
        questions,
        category,
        rating,
        createdOn,
        createdBy
    });

    Quiz.find({createdBy: "5dea39f9bfd33a330cd9692b"}, (err, docs) => {
        if(!docs.length){
            newQuiz.save()
            .then(() => res.json("Quiz Created Successfully"))
            .catch((err) => res.status(400).json(`Err ${err}`));
        } 
    })
    .then(docs => res.json("Quiz already exists"))
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;