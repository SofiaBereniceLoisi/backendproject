import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollectionName = "users";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isGithub: { type: Boolean, default: false }
})

userSchema.plugin(mongoosePaginate);

export const UserModel = model(
    userCollectionName,
    userSchema
);