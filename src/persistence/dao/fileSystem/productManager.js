import fs from 'fs';
import logger from '../../../config/logConfig';

class ProductManager {
    constructor(path) {
        this.path = path
    }
    //getAllProducts
    getAll = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            logger.error('Error getting products: ', error);
            return null;
        }
    }

    generateId = async () => {
        try {
            const products = await this.getAll();
            if (products.length === 0) {
                return 1;
            } else {
                const lastProductId = products[products.length - 1].id;
                return lastProductId + 1;
            }
        } catch (error) {
            logger.error('Error generating id :', error);
            return null;
        }
    };
    //addProduct
    create = async (productData) => {
        try {
            const products = await this.getAll();

            const { title, description, price, code, stock, status = true, category, thumbnails } = productData;

            if (products.some(product => product.code === code)) {
                logger.error('Error: Product code is already in use:', error);
                return null;
            }

            const id = await this.generateId();
            const newProduct = {
                id,
                title,
                description,
                price,
                code,
                stock,
                status,
                category,
                thumbnails: thumbnails || []
            };

            logger.info('New product:', newProduct);
            products.push(newProduct);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            logger.info('Product created successfully');
            return newProduct;
        } catch (error) {
            logger.error('Error creating product:', error);
            return null;
        }
    }
    //getProductById
    getById = async (id) => {
        try {
            const products = await this.getAll();
            const foundProduct = products.find(product => product.id === parseInt(id));

            if (foundProduct) {
                logger.info(`Product of id ${id} found: ${foundProduct}` );
                return foundProduct;
            } else {
                logger.info(`Error: Product of id ${id} NOT FOUND.`);
                return null;
            }
        } catch (error) {
            logger.error('Error getting produt by id: ', error);
            return null;
        }
    }
    //deleteProduct
    delete = async (id) => {
        try {
            const products = await this.getAll();
            const productToDelete = await this.getById(id);

            if (productToDelete) {
                const updatedProducts = products.filter(product => product.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
                logger.info('Product deleted successfully.');
                return true;
            } else {
                logger.info(`Error deleting product: Product of id ${id} NOT FOUND.`);
                return false;
            }
        } catch (error) {
            logger.error('Error deleting product', error);
            return null;
        }
    }
    //updateProduct
    update = async (id, updatedFields) => {
        try {
            const products = await this.getAll();
            const indexToUpdate = products.findIndex(product => product.id === id);

            if (indexToUpdate !== -1) {
                products[indexToUpdate] = { ...products[indexToUpdate], ...updatedFields };

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                logger.info(`Product of ID: ${id} updated successfully.`);
                return products[indexToUpdate];
            } else {
                logger.info(`Error updating product: Product of ID ${id} NOT FOUND.`);
                return null;
            }
        } catch (error) {
            logger.error('Error udating product:', error);
            return null;
        }
    }
}

export default ProductManager;

// const products = new productManager('./products.json');

// TESTER -------------------------------------------------------

// Probando agregar un producto:
// const result = await products.addProduct(
//     'Producto 6',
//     'Descripción del nuevo producto 6',
//     7700,
//     'imagen.jpg',
//     'A666',
//     6
// );

// Probando encontrar un producto por su id:
// const productIdToFind = await products.getProductById(2);

// Probando que muestre la lista completa de productos:
// const result = await products.getProducts()
// console.log("🚀 ~ result:", result)

// Eliminando el producto de id indicado:
// const result = await products.deleteProduct(3);

// Prueba de actualizar datos de producto existente:
// const result = await products.updateProduct(2, {stock: 100});

// Prueba de actualizar datos de producto que no existe:
// const result = await products.updateProduct(8, {stock: 100});
