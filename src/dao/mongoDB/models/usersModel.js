import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollectionName = "users";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
})

userSchema.plugin(mongoosePaginate);

export const UserModel = model(
    userCollectionName,
    userSchema
);