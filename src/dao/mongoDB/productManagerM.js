import { ProductsModel } from "./models/productsModel.js";

export default class ProductManagerM {

    async getAll() {
        try {
            return await ProductsModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id){
        try {
            return await ProductsModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async create(obj){
        try {
            return ProductsModel.create(obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj){
        try {
            return await ProductsModel.findByIdAndUpdate(id, obj, {new : true})
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id){
        try {
            return await ProductsModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}








