import app from '../../app.js';
import { describe, test, before } from 'node:test';
import { UserModel } from '../../persistence/dao/mongoDB/models/usersModel.js';
import assert from 'node:assert';
import logger from "../../config/logConfig.js";
import mongoose from 'mongoose';

const mockUser = () => {
    return {
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        password: "test"
    };
}

const apiURL = 'http://localhost:8080/users/register';

describe('Testing de integración para userRouter', () => {

    before(async () => {
        logger.info("Comenzaron las pruebas del userRouter");
        await UserModel.deleteMany({});
        logger.info("Se limpio la coleccion de usuarios");
    })

    test('[POST] /users/register', async () => {
        const doc = mockUser();
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doc)
        });
        const responseJson = await response.json();
        assert.ok(responseJson, '_id');
        assert.equal(body.email , responseJson.email);
    });
});