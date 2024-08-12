import { fakerES as faker } from "@faker-js/faker";

export const generateProds = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.commerce.isbn(),
        stock: faker.number.int({ max: 50 }),
        status: faker.datatype.boolean({ probability: 1.0 }),
        category: faker.commerce.department()
    }
}