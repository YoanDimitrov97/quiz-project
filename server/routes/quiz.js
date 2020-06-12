const router = require("express").Router();
const path = require("path");
const Quiz = require("../models/quiz.model");
const Rooms = require("../models/rooms.model");
const sessionCheck = require("../../middleware/sessionCheck");

router.route("/").get(sessionCheck, (req, res) => {});

//loads all quizes
router.route("/all_quizes").post((req, res) => {
    Quiz.find()
        .sort({ rating: "desc" })
        .limit(20)
        .then((doc) => res.json(doc))
        .catch((err) => res.status(400).json("Error" + err));
});

router.route("/my_quiz").post((req, res) => {
    Quiz.find({ createdBy: req.body.createdBy })
        .then((doc) => res.json(doc))
        .catch((err) => res.status(400).json("Error" + err));
});

router.route("/specific_quiz").post((req, res) => {
    Quiz.findOne({ _id: req.body.id })
        .then((doc) => res.json(doc))
        .catch((err) => res.status(400).json("Error" + err));
});

router.route("/quiz/create").post((req, res) => {
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
        createdBy,
    });
    newQuiz
        .save()
        .then(() => {
            res.json("Quiz Created Successfully");
        })
        .catch((err) => res.status(400).json(`Err ${err}`));
});

router.route("/quiz/edit").post((req, res) => {
    const quizId = req.body.quizId;
    const title = req.body.title;
    const numOfQuestions = req.body.numOfQuestions;
    const questions = req.body.questions;
    const category = req.body.category;
    const rating = 0;
    const createdOn = new Date();
    const createdBy = req.body.createdBy;
    var query = { createdBy: createdBy, _id: quizId };
    console.log("LOG");
    Quiz.findOneAndUpdate(query, {
        title: title,
        numOfQuestions: numOfQuestions,
        questions: questions,
        category: category,
        rating: rating,
        createdOn: createdOn,
        createdBy: createdBy,
    })
        .then(() => res.json("Quiz Updated!"))
        .catch((err) => res.status(400).json(`Err ${err}`));
});

router.route("/update_quiz").put((req, res) => {
    Quiz.findOne({ _id: req.body.quizId })
        .then((doc) => res.json(doc))
        .catch((err) => res.status(400).json("Error" + err));
});

router.route("/quiz/delete").post((req, res) => {
    Quiz.deleteOne({ _id: req.body.quizId })
        .then(() => res.json(req.body.quizId))
        .catch((err) => {
            console.log(err);
        });
});

router.route("/create_quiz/delete_question").post((req, res) => {
    var query = { id: req.body.questionId };
    Quiz.findOneAndUpdate(
        { _id: req.body.quizId },
        { $pull: { questions: query }, $inc: { numOfQuestions: -1 } }
    )
        .then(() => {
            res.json("Successfully delete this question");
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
