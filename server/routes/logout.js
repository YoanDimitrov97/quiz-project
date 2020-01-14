const router = require('express').Router();
const Session = require('../models/session.model');

router.route('/').get((req, res) => {
    const sessionId = req.session.id;
    Session.deleteOne({ _id: sessionId}, (err) => {
        if(!err){
            req.session.destroy();
            const sessDestroy = true;
            res.json(sessDestroy);
        }else {
            console.log("Something wrong !");
        }
    });
    
});

module.exports = router;