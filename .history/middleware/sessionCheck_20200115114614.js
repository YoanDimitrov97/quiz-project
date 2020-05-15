const sessionCheck = (req, res) => {
    if(!req.session.userId){
        console.log(req.session.userId);
        console.log(req.session.id);
        res.json({
            isLoggedIn: false
        });
    }else {
        console.log(req.session.userId);
        console.log(req.session.id);
        res.json({
            isLoggedIn: true,
            userName: req.session.username,
        });
    }
};

module.exports = sessionCheck;