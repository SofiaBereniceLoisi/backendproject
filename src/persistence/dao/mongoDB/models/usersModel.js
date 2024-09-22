import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollectionName = "users";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    password: { type: String, required: true },
    role: { type: String, default: 'user', required: true},
    isGithub: { type: Boolean, default: false },
    cart: { type: Schema.Types.ObjectId, ref: 'carts', default: []}, // Referencia al carrito
    last_connection: { type: Date, default: null }
})

userSchema.plugin(mongoosePaginate);

export const UserModel = model(
    userCollectionName,
    userSchema
);