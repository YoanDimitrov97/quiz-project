const router = require('express').Router();
const path = require('path');
const Rooms = require("../models/rooms.model");
const sessionCheck = require('../../middleware/sessionCheck');

//Creating room
router.route('/create_room').post((req,res) => {
    const usersInRoom = req.body.usersInRoom;
    const quizId = req.body.quizId;
    const owner = req.body.owner;
    const code = req.body.code;

    const newRoom = new Rooms({
        usersInRoom,
        quizId,
        owner,
        code,
    });
    newRoom.save()
    .then(() => {
        Rooms.findOne({owner:owner}).sort({createdAt: -1})
        .then(room => res.json(room))
        .catch(err => res.status(400).json('Error' + err));
    })
    .catch(err => res.status(400).json('Error' + err));
})

//Gets information for a given room
router.route('/get_room').post((req,res) => {
    var id = req.body.id;
    Rooms.findOne({code: id})
    .then(roomInfo => res.json(roomInfo))
    .catch(err => res.status(400).json('Error' + err));
})

router.route("/join_room").post((req,res) => {
    var code = req.body.code;
    console.log(`${req.body.name} joining room...`)
    var query = {id: req.body.id, name: req.body.name};
    Rooms.findOneAndUpdate({code:code}, {$push: {usersInRoom:query}})
    .then(room => res.json(room))
    .catch(err => res.status(400).json('Error' + err));

})

//removes user from a given room
router.route("/remove_from_room").post((req,res) => {
    var code = req.body.code;
    var query = {id: req.body.id, name: req.body.name};
    Rooms.findOneAndUpdate({code:code}, {$pull: {usersInRoom:query}})
    .then((room) => {
        //room users still exist even when removed but when you say res.json(room) 
        // it sends them as non existing (which should be right behaviour)
        //doesn't matter if there is an if or not, check this case out later
        if(room.usersInRoom[0])
            Rooms.deleteOne({code:code, usersInRoom:{$size: 0}})
            .then(() => {console.log("Room deleted successfully!")})
            .catch(err => res.status(400).json('Error' + err));
        else 
        res.json(room)
    })
    .catch(err => res.status(400).json('Error' + err));
})
//Need a function to add users to a room
module.exports = router;