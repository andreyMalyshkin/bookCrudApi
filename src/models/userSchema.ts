import {model, Schema} from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: Number, default: 1 }
});

export const User = model('User', userSchema);