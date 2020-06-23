const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{type:String, required:true},
    firstName:{type:String},
    lastName: {type:String},
    password:{type:String},
    email:{type:String},
    completedQuizes:{type:Array},
}, {
    timestamps:true
});


const User = mongoose.model('User', userSchema);
module.exports = User;