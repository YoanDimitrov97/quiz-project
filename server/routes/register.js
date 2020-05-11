const router = require('express').Router();
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/').post((req, res) => {
    console.log(req.body);
    
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = bcrypt.hashSync(req.body.password, 10);
    const email = req.body.email;
    const createdOn = new Date();

    const newUser = new User({
        username,
        firstName,
        lastName,
        password,
        email,
        createdOn
    });

    newUser.save()
    .then(() => res.status(200).json("Successfully registered"))
    .catch(err => res.status(400).json("Error: " + err));
})


module.exports = router;