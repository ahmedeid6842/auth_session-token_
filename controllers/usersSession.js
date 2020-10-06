const bcrypt = require("bcryptjs");
const User = require("../models/users");

module.exports.getLogin = (req, res) => {
    res.render("login", {
        path: "session",
        validation: ""
    });
}

module.exports.postLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("signup", {
            validation: errors.array(),
            path: "session"
        });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.redirect("/session/login");
    console.log(user);
    console.log(email, password);
    let verified = await bcrypt.compare(password, user.password);

    if (!verified) {
        console.log("wrong-password");
        return res.redirect("/session/login");
    }

    req.session.user = user;
    req.session.isLoggenIn = true;
    res.redirect("/session/home")
}

module.exports.getSignup = (req, res) => {
    res.render("signup", {
        path: "session",
        validation: ""
    });
}

module.exports.postSignup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("signup", {
            validation: errors.array(),
            path: "session"
        });
    }

    const { email, password } = req.body;
    const user = new User({
        email,
        password
    })
    console.log(password);
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    req.session.user = user;
    req.session.isLoggenIn = true
    res.redirect("/session/home")
}


module.exports.getHome = (req, res) => {
    res.render("welcome", {
        name: req.user.email.split("@")[0],
        path: "session"
    })
}

module.exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log("here");
        if (err) {
            console.log(err);
            return res.redirect("/session/home");
        }
        res.clearCookie("sessionID");
        res.redirect('/session/login')

    })
}