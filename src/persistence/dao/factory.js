// import ProductManagerM from './mongoDB/productManagerM.js';
// import ProductManager from './fileSystem/productManager.js';
// import UserManagerM from './mongoDB/userManagerM.js';
// import CartManagerM from './mongoDB/cartManagerM.js';
// import config from '../../config.js';
// import { initMongoDB } from './mongoDB/connectionMDB.js';
// import __dirname from '../../utils.js';

// let productDao = null;
// let userDao = null;
// let cartDao = null;

// let persistence = config.PERSISTENCE;

// switch (persistence) {
//     case 'FS':
//         productDao = new ProductManager(`${__dirname}/dao/fileSystem/data/products.json`);
//         break;
//     case 'MONGO':
//         initMongoDB();
//         productDao = new ProductManagerM();
//         userDao = new UserManagerM();
//         cartDao = new CartManagerM();
//         break;
//     default:
//         productDao = new ProductManagerM();
//         userDao = new UserManagerM();
//         cartDao = new CartManagerM();
//         break;
// }

// export default { userDao, productDao, cartDao }