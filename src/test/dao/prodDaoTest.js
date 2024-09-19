import logger from "../../config/logConfig.js";
import assert from "assert";
import { describe, test, before, beforeEach, after } from 'node:test';
import ProductManagerM from "../../persistence/dao/mongoDB/productManagerM.js";
import { initMongoDBTEST } from "../../persistence/dao/mongoDB/connectionMDB-TEST.js";
import mongoose from "mongoose";

describe("Tests unitarios de productsDao", () => {
    let productManager = null;
    const product = {
        title: 'test',
        description: 'test',
        price: 1,
        thumbnail: 'test',
        code: 'test',
        stock: 1,
        category: 'test',
        owner: 'test'
    };
    before(async () => {
        productManager = new ProductManagerM();
        initMongoDBTEST();
        logger.info("Comenzaron las pruebas de productos");
    })

    beforeEach(async () => {
        // await ProductsModel.deleteMany({});
        await mongoose.connection.collections['products'].drop();
        logger.info("Se limpio la coleccion de productos");
    })

    after(() => {
        logger.info("Finalizaron las pruebas de productos");
    })

    test('Deberia obtener todos los productos', async () => {
        const response = await productManager.getAll();
        assert.equal(Array.isArray(response.docs), true);
        assert.equal(response.docs.length, 0);
    });

    test('Deberia crear un producto', async () => {
        const response = await productManager.create(product);
        const products = await productManager.getAll();
        assert.ok(response._id);
        assert.strictEqual(response.title, product.title);
        assert.strictEqual(typeof response.title, 'string');
        assert.strictEqual(response.description, product.description);
        assert.strictEqual(response.price, product.price);
        assert.strictEqual(typeof response.price, 'number');
        assert.strictEqual(response.code, product.code);
        assert.strictEqual(response.stock, product.stock);
        assert.strictEqual(typeof response.stock, 'number');
        assert.strictEqual(response.category, product.category);
        assert.strictEqual(response.owner, product.owner);
        assert.strictEqual(products.docs.length, 1);
        assert.doesNotThrow(() => products)
    });

    test('Deberia obtener un producto por id', async () => {
        const response = await productManager.create(product);
        const prod = await productManager.getById(response._id);
        assert.strictEqual(response._id.toString(), prod._id.toString());
        assert.doesNotThrow(() => prod)
    });

    test('Debería actualizar un producto', async () => {
        const response = await productManager.create(product);
        const prod = await productManager.getById(response._id);
        const updatedProduct = {
            title: 'test2',
        };
        const responseUpdate = await productManager.update(prod._id, updatedProduct);
        assert.strictEqual(responseUpdate.title, updatedProduct.title);
        assert.doesNotThrow(() => responseUpdate)
    });

    test('Deberia eliminar un producto', async () => {
        const response = await productManager.create(product);
        const prod = await productManager.getById(response._id);
        await productManager.delete(prod._id);
        const deletedProd = await productManager.getById(prod._id);
        assert.strictEqual(deletedProd, null);
        assert.doesNotThrow(() => deletedProd)
    });

});