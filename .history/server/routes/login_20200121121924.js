const router = require('express').Router();
const path = require('path');
const bcrypt = require("bcryptjs");
const User = require('../models/users.model');
const sessionCheck = require('../../middleware/sessionCheck');

router.route('/').post((req, res) => {
    const { email, password } = req.body;
    User.findOne({email: email}, (err, data) => {
        if(!err){
            bcrypt.compare(password, data.password, (err, result) => {
                if(result){
                    req.session.userId = data._id;
                    req.session.username = data.username;
                    res.json(req.session);
                }else {
                    console.log('Wrong email or pass !');
                }
            });
        }else {
            console.log(`Email not in DB`);
        }
    });
});

router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'login.html'));
})

module.exports = router;