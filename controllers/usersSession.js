const bcrypt = require("bcrypt");
const User = require("../models/users");
const { userSchemaValidation } = require("../validators/user");

module.exports.loginController = async (req, res) => {
    /**
     * DONE: validate request body to match user shcema 
     * DONE: check if email already exist or not
     * DONE: compare request body password and user and check if they match 
     * DONE: if every thing is okay assing logged user to session 
     */
    const { error } = userSchemaValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("invalid email or password");

    let verified = await bcrypt.compare(password, user.password);
    if (!verified) return res.status(400).send("invalid email or password");

    req.session.user = user;
    req.session.isLoggedIn = true;

    return res.send(`login successfully ${user.email}`)
}


module.exports.registerController = async (req, res) => {
    /**
     * DONE: validate request body to match user schema 
     * DONE: check if email unique or not
     * DONE: hash request body password 
     * DONE: save user password
     */
    const { error } = userSchemaValidation(req.body);
    if (error) return res.status(400).send(error.message);

    let { email, password } = req.body;

    let salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let user = await User.create({ email, password });

    req.session.user = user;
    req.session.isLoggedIn = true
    return res.send(`register successfully ${user.email}`)
}


module.exports.getHomeController = (req, res) => {
    /**
     * DONE: must be authenticated to reach your endpoint
     */
    return res.send(`welcome ${req.session.user.email.split("@")[0]}`)
}

module.exports.logoutController = (req, res) => {
    /**
     * DONE: delete session in both redis and cookie
     */
    return req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("an error occur try to logout again");
        }
        res.clearCookie("sessionID");
        res.send("logout seccessfully")
    })
}