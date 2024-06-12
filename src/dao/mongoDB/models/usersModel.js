import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollectionName = "users";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: string, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: usuario }
})

userSchema.plugin(mongoosePaginate);

export const UsersModel = model(
    userCollectionName,
    userSchema
);