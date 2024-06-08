import { ProductsModel } from "./models/productsModel.js";

export default class ProductManagerM {

    async getAll(page = 1, limit = 10, title, sort) {
        try {
            const filter = title ? { 'title': title } : {};
            let sortOrder = {};
            if (sort) {
                sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            }
            return await ProductsModel.paginate(filter, { page, limit, sort: sortOrder });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return await ProductsModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async create(obj) {
        try {
            return ProductsModel.create(obj);
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj) {
        try {
            return await ProductsModel.findByIdAndUpdate(id, obj, { new: true })
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        try {
            return await ProductsModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}








