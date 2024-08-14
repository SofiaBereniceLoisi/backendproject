import Services from "./mainServices.js";
import { __dirname } from '../utils/utils.js';
import { generateProds } from "../utils/prodsUtils.js";
import { ProductsModel } from "../persistence/dao/mongoDB/models/productsModel.js";

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

export const createProdMock = async (cant = 50) => {
    try {
        const prodsArray = [];
        for(let i=0; i<cant;i++ ){
            const prod = generateProds();
            prodsArray.push(prod);
        }
        return await ProductsModel.create(prodsArray);
        // return prodsArray;
    } catch (error) {
        throw new Error(error);
    }
}

export const getProds = async () => {
    try {
        return await ProductsModel.find({});
    } catch (error) {
        throw new Error(error);
    }
}