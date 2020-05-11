const sessionCheck = (req, res) => {
    if(!req.session.userId){
        res.json({
            isLoggedIn: false
        });
    }else {
        res.json({
            isLoggedIn: true,
            userName: req.session.username,
            userId: req.session.userId,
        });
    }
};

module.exports = sessionCheck;