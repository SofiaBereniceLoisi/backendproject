import logger from "../../config/logConfig.js";
import assert from "assert";
import { describe, test, before, beforeEach, after } from 'node:test';
import CartManagerM from "../../persistence/dao/mongoDB/cartManagerM.js";
import ProductManagerM from "../../persistence/dao/mongoDB/productManagerM.js";
import { initMongoDBTEST } from "../../persistence/dao/mongoDB/connectionMDB-TEST.js";
import mongoose from "mongoose";

describe("Tests unitarios de productsDao", () => {
    let cartManager = null;
    let productManager = null;
    const productId = new mongoose.Types.ObjectId();
    const product = {
        title: 'test',
        description: 'test',
        price: 1,
        code: 'test',
        stock: 1,
        category: 'test',
        owner: 'test'
    };

    before(async () => {
        cartManager = new CartManagerM();
        productManager = new ProductManagerM();
        await initMongoDBTEST();
        logger.info("Comenzaron las pruebas de carritos");
    })

    beforeEach(async () => {
        // await ProductsModel.deleteMany({});
        await mongoose.connection.collections['carts'].drop();
        await mongoose.connection.collections['products'].drop();
        logger.info("Se limpio la coleccion de productos");
        logger.info("Se limpio la coleccion de carritos");
    })

    after(() => {
        logger.info("Finalizaron las pruebas de carritos");
    })

    test('Debería crear un carrito', async () => {
        const response = await cartManager.create();
        const carts = await cartManager.getAll();
        assert.ok(response._id);
        assert.strictEqual(response.products.length, 0);
        assert.strictEqual(carts.length, 1);
    })

    test('Debería obtener un carrito por id', async () => {
        const cart = await cartManager.create();
        const response = await cartManager.getById(cart._id);
        assert.strictEqual(response._id.toString(), cart._id.toString());
        assert.doesNotThrow(() => response);
    });

    test('Debería agregar un producto al carrito', async () => {
        const cart = await cartManager.create();
        const createdProd = await productManager.create(product);
        const updatedCart = await cartManager.addProdToCart(cart._id, createdProd._id.toString(), 2);
        assert.strictEqual(updatedCart.products.length, 1);
        assert.strictEqual(updatedCart.products[0].product.toString(), createdProd._id.toString());
        assert.strictEqual(updatedCart.products[0].quantity, 2);
    });

    test('Debería actualizar la cantidad de un producto en el carrito', async () => {
        const cart = await cartManager.create();
        const createdProd = await productManager.create(product);
        await cartManager.addProdToCart(cart._id, createdProd._id.toString(), 1);
        const updatedCart = await cartManager.updateProdQuantityToCart(cart._id, createdProd._id.toString(), 5);
        assert.strictEqual(updatedCart.products[0].quantity, 5);
    });

    test('Debería remover un producto del carrito', async () => {
        const cart = await cartManager.create();
        const createdProd = await productManager.create(product);
        await cartManager.addProdToCart(cart._id, createdProd._id.toString(), 2);
        const cartAfterRemove = await cartManager.removeProdToCart(cart._id, createdProd._id.toString());
        assert.strictEqual(cartAfterRemove.products.length, 0);
    });

    test('Debería vaciar el carrito', async () => {
        const cart = await cartManager.create();
        const createdProd = await productManager.create(product);
        await cartManager.addProdToCart(cart._id, createdProd._id.toString(), 1);
        const clearedCart = await cartManager.clearCart(cart._id);
        assert.strictEqual(clearedCart.products.length, 0);
    });

    test('Debería verificar si un producto existe en el carrito', async () => {
        const cart = await cartManager.create();
        const createdProd = await productManager.create(product);
        await cartManager.addProdToCart(cart._id, createdProd._id.toString(), 1);
        const productExists = await cartManager.existProdInCart(cart._id, createdProd._id.toString());
        assert.ok(productExists);
    });
});