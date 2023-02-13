const mongoose = require("mongoose");

const AddressBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    contactNumber: {
        type: String
    },
    address: {
        country: { type: String },
        city: {
            type: String
        },
        street: { type: String },
        postalCode: { type: String },
    }
})

module.exports = mongoose.model("address_book", AddressBookSchema);