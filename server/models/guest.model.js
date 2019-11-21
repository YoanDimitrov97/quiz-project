const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const guestSchema = new Schema({
    username:{type:String, required:true}  
}, {
    timestamps:true
})


const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest;