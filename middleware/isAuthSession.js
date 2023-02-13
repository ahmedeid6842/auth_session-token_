module.exports.isAuth = (req, res, next) => { // this middleware to check if user is authenticated or not  
    if (!req.session.isLoggedIn) {
        return res.send("un authenticated");
    }
    next();
}

module.exports.isLogged = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.send("already logged In")
    }
    next();
}