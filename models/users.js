const mongoose = require("mongoose");


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



module.exports = mongoose.model("user", userSchema);