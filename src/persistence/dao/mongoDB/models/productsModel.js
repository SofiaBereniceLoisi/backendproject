import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollectionName = "products";

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    status: { type: String, default: true },
    category: { type: String, required: true },
    owner: { type: String, required: true, default: 'admin' },
    thumbnails: { type: Array, default: [] }
})

productSchema.plugin(mongoosePaginate);

export const ProductsModel = model(
    productCollectionName,
    productSchema
);