const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 8,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        maxlength: 255
    }
})

userSchema.methods.createAccessToken = function () {
    return jwt.sign({ userId: this._id }, process.env.AccessJWTSecret + this.password, { expiresIn: '15m' });
}

userSchema.methods.createRefreshToken = function () {
    return jwt.sign({ userId: this._id }, process.env.RefreshJWTSecret + this.password, { expiresIn: "3d" });
}

module.exports = mongoose.model("user", userSchema);