import { ProductsModel } from "./models/productsModel.js";
import MongoDao from "./mongoDAO.js";

export default class ProductManagerM extends MongoDao {

    constructor(){
        super(ProductsModel);
    }

    async getAll(page = 1, limit = 9, title, sort) {
        try {
            const filter = title ? { 'title': title } : {};
            let sortOrder = {};
            if (sort) {
                sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            }
            return await this.model.paginate(filter, { page, limit, sort: sortOrder });
        } catch (error) {
            throw new Error(error);
        }
    }
}
