import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.log('Error al obtener productos:', error);
            return null;
        }
    }

    generateId = async () => {
        try {
            const products = await this.getProducts();
            if (products.length === 0) {
                return 1;
            } else {
                const lastProductId = products[products.length - 1].id;
                return lastProductId + 1;
            }
        } catch (error) {
            console.error('Error al generar ID del producto:', error);
            return null;
        }
    };

    addProduct = async (productData) => {
        try {
            const products = await this.getProducts();

            const { title, description, price, code, stock, status = true, category, thumbnails } = productData;

            if (products.some(product => product.code === code)) {
                console.log('Error: El código del producto ya está en uso.');
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

            console.log('producto nuevo:', newProduct);
            products.push(newProduct);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log('Producto agregado satisfactoriamente.');

            return newProduct;
        } catch (error) {
            console.log('Error al agregar producto:', error);
            return null;
        }
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const foundProduct = products.find(product => product.id === parseInt(id));

            if (foundProduct) {
                console.log('Producto encontrado de id:', id, foundProduct);
                return foundProduct;
            } else {
                console.log('Error: No se encontró ningún producto con el ID ingresado.');
                return null;
            }
        } catch (error) {
            console.log('Error al obtener producto:', error);
            return null;
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts();
            const productToDelete = await this.getProductById(id);

            if (productToDelete) {
                const updatedProducts = products.filter(product => product.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
                console.log('Producto eliminado satisfactoriamente.');
                return true;
            } else {
                console.log('Error: No se encontró ningún producto con el ID ingresado para eliminar.');
                return false;
            }
        } catch (error) {
            console.log('Error al eliminar producto:', error);
            return null;
        }
    }

    updateProduct = async (id, updatedFields) => {
        try {
            const products = await this.getProducts();
            const indexToUpdate = products.findIndex(product => product.id === id);

            if (indexToUpdate !== -1) {
                products[indexToUpdate] = { ...products[indexToUpdate], ...updatedFields };

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`Producto con ID ${id} actualizado satisfactoriamente.`);
                return products[indexToUpdate];
            } else {
                console.log(`Error: No se encontró ningún producto con el ID ${id} para actualizar.`);
                return null;
            }
        } catch (error) {
            console.log('Error al actualizar producto:', error);
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
