const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
    _id: {type: String},
    expires: {type: Date},
    session: {type: String},
});


const Session = mongoose.model('Guest', sessionSchema);
module.exports = Session;