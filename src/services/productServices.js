import Services from "./mainServices.js";
import __dirname from '../utils.js';

// Dao de mongo db
import ProductManagerM from "../persistence/dao/mongoDB/productManagerM.js";
const productDao = new ProductManagerM();


export default class ProductService extends Services {
    constructor() {
        super(productDao)
    }

    async getAll(page, limit, title, sort) {
        try {
            return await productDao.getAll(page, limit, title, sort);
        } catch (error) {
            throw new Error(error)
        }
    }
}