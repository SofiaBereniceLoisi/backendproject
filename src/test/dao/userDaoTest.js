import logger from "../../config/logConfig.js";
import assert from "assert";
import { describe, test, before, beforeEach, after } from 'node:test';
import UserManagerM from "../../persistence/dao/mongoDB/userManagerM.js";
import { initMongoDBTEST } from "../../persistence/dao/mongoDB/connectionMDB-TEST.js";
import mongoose from "mongoose";

describe("Tests unitarios de productsDao", () => {
    let userManager = null;
    let user = {
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        age: 1,
        password: 'test',
        role: 'user'
    };

    before(async () => {
        userManager = new UserManagerM();
        await initMongoDBTEST();
        logger.info("Comenzaron las pruebas de usuarios");
    })

    beforeEach(async () => {
        await mongoose.connection.collections['users'].drop();
        logger.info("Se limpio la coleccion de usuarios");
    })

    after(() => {
        logger.info("Finalizaron las pruebas de usuarios");
    })

    test('Debería crear un usuario', async () => {
        const response = await userManager.register(user);
        assert.ok(response._id);
        const foundUser = await userManager.getByEmail(user.email);
        assert.strictEqual(foundUser.email, response.email);
        assert.strictEqual(foundUser.first_name, response.first_name);
        assert.strictEqual(foundUser.last_name, response.last_name);
        assert.strictEqual(foundUser.age, response.age);
        assert.strictEqual(foundUser.password, response.password);
        assert.strictEqual(foundUser.role, response.role);
    })

    test('Debería obtener un usuario por id', async () => {
        const response = await userManager.register(user);
        const foundUser = await userManager.getById(response._id);
        assert.strictEqual(response._id.toString(), foundUser._id.toString());
        assert.doesNotThrow(() => foundUser)
    });

    test('Debería obtener un usuario por email', async () => {
        const response = await userManager.register(user);
        const foundUser = await userManager.getByEmail(response.email);
        assert.strictEqual(foundUser.email, response.email);
    })
});