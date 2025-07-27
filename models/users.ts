import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser {
    email: string;
    password: string;
}

export interface IUserDocument extends IUser, mongoose.Document {
    createAccessToken(): string;
    createRefreshToken(): string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 8,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 255
    }
})

userSchema.methods.createAccessToken = function () {
    return jwt.sign({ userId: this._id }, process.env.ACCESS_JWT_SECRET + this.password, { expiresIn: '15m' });
}

userSchema.methods.createRefreshToken = function () {
    return jwt.sign({ userId: this._id }, process.env.REFRESH_JWT_SECRET + this.password, { expiresIn: "3d" });
}

export default mongoose.model<IUserDocument>("user", userSchema);