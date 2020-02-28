const router = require('express').Router();
const path = require('path');
const Rooms = require("../models/rooms.model");
const sessionCheck = require('../../middleware/sessionCheck');

//Creating room
router.route('/create_room').post((req,res) => {
    const usersInRoom = req.body.usersInRoom;
    console.log("test below...");
    console.log(req.body);
    const quizId = req.body.quizId;
    const owner = req.body.owner;

    const newRoom = new Rooms({
        usersInRoom,
        quizId,
        owner,
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
    Rooms.findOne({_id: id})
    .then(roomInfo => res.json(roomInfo))
    .catch(err => res.status(400).json('Error' + err));
})

//Need a function to add users to a room

module.exports = router;