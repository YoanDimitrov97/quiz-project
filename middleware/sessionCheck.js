const sessionCheck = (req, res, next) => {
    if(!req.session.userId){
        console.log(req.session.id);
        res.redirect('/login');  
    }else {
        console.log(req.session.id);
        next();
    }
};

module.exports = sessionCheck;