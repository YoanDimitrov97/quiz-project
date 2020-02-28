const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const roomSchema = new Schema({
    id:{type:mongoose.Types.ObjectId},
    usersInRoom:Array,
    quizId:{type:mongoose.Types.ObjectId, ref: "Quiz"},
    owner:{type:mongoose.Types.ObjectId, ref: "User"}
}, {
    timestamps:true
})


const Room = mongoose.model('Room', roomSchema);
module.exports = Room;