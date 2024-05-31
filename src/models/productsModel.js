import { Schema, model } from "mongoose";

const productCollectionName = "product";

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true , unique: true},
    stock: { type: Number, required: true },
    status: { type: String, default: true },
    category: { type: String, required: true },
})

export const ProductsModel = model(
    productCollectionName,
    productSchema
);