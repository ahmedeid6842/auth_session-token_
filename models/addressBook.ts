import mongoose from "mongoose";

export interface IAddressBook {
    userId: mongoose.Schema.Types.ObjectId;
    name: {
        firstName: string;
        lastName: string;
    };
    contactNumber: string;
    address: {
        country?: string;
        city?: string;
        street?: string;
        postalCode?: string;
    };
}

export interface IAddressBookDocument extends IAddressBook, mongoose.Document {}

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

export default mongoose.model<IAddressBookDocument>("address_book", AddressBookSchema);