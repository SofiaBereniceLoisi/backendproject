import app from '../../app.js';
import request from 'supertest';
import logger from "../../config/logConfig.js";
import config from '../../config/config.js';
import mongoose from 'mongoose';
import { initMongoDBTEST } from "../../persistence/dao/mongoDB/connectionMDB-TEST.js";
import { fakerES as faker } from '@faker-js/faker';

describe('Testing de integración para productsRouter', () => {
    const user = {
        email: "test@test.com",
        password: "test"
    }

    const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.commerce.isbn(),
        stock: faker.number.int({ max: 50 }),
        category: faker.commerce.department()
    }

    beforeAll(async () => {
        await initMongoDBTEST();
        await request(app).post('/api/login').send(user);
        logger.info("Comenzaron las pruebas del productsRouter");
        await mongoose.connection.collections['products'].drop();
        logger.info("Se limpio la coleccion de productos");
    })

    afterAll(async () => {
        logger.info("Finalizaron las pruebas de la app");
    })

    // test('', ()=>{})
    test('[GET] /api/products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(0);
        expect(response.body).toBeInstanceOf(Array);
    })

    test('[POST]/api/products', async () => {
        const response = await request(app).post('/api/products').send(product);
        const id = response.body._id;
        expect(id).toBeDefined();
        const titleResponse = response.body.title;
        const titleExpected = product.title;
        const statusCode = response.statusCode;
        expect(statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(titleResponse).toBe(titleExpected);
    })
})
