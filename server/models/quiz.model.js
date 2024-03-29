const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const quizSchema = new Schema({
    title:{type:String, required:true},
    numOfQuestions:{type:Number},
    questions:{type:Array, required:true},
    category: {type: String, required:true},
    rating:{type:Number},
    createdOn:{type:Date},
    createdBy:{type:mongoose.Types.ObjectId, ref: 'User'},
}, {
    timestamps:true
})


const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;