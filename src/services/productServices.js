// Dao de mongo db
import ProductManagerM from "../dao/mongoDB/productManagerM.js";
const productDao = new ProductManagerM();

//Dao de fileSystem
// import ProductManager from "../dao/fileSystem/productManager.js";
// const productDao = new ProductManager(`${__dirname}/dao/fileSystem/data/products.json`)

import __dirname from '../utils.js';

export const getAll = async (page, limit, title, sort) => {
     try {
        return await productDao.getAll(page, limit, title, sort);
     } catch (error) {
        throw new Error(error)
     }
}

export const getById = async (id) => {
    try {
       return await productDao.getById(id);
    } catch (error) {
        throw new Error(error)
    }
}

export const create = async (obj) => {
    try {
       return await productDao.create(obj);
    } catch (error) {
        throw new Error(error)
    }
}

export const update = async (id,obj) => {
    try {
       return await productDao.update(id,obj)
    } catch (error) {
        throw new Error(error)
    }
}

export const remove = async (id) => {
    try {
       return await productDao.delete(id);
    } catch (error) {
        throw new Error(error)
    }
}