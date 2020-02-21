const router = require('express').Router();
const path = require('path');
const Users = require("../models/users.model");
const sessionCheck = require('../../middleware/sessionCheck');

router.route('/play/completeQuiz').post((req,res) => {
    const userId = req.body.userId;
    const quizId = req.body.quizId;
    const earnedPoints = req.body.earnedPoints;

    if(userId){
        Users.find({_id: userId})
        .then(docs => {
            if(!docs.length){
                console.log("User doesn't exist...");
            } else {
                Users.updateOne({_id: userId}, {
                    completedQuizes: [{"quizId": quizId, "earnedPoints":earnedPoints}],
                }, {new: true})
                .then(() => res.json("Quiz Updated!"))
                .catch((err) => res.status(400).json(`Err ${err}`));
            }
        })
        .catch(err => res.status(400).json('Error' + err));
    }  
})

module.exports = router;