import fs from 'fs';

class productManager {
    constructor(path) {
        this.nextProductId = 1;
        this.path = path
    }

    getProducts = async () => {
        const data = await fs.promises.readFile(this.path, 'utf8');
        const products = JSON.parse(data)
        return products
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        const products = await this.getProducts()

        if (!title.trim() || !description.trim() || !price || !thumbnail.trim() || !code.trim() || !stock) {
            console.log('Error: Debes llenar todos los campos.');
            return null;
        }

        if (products.some(product => product.code === code)) {
            console.log('Error: El código del producto ya está en uso.');
            return null;
        }

        const newProduct = {
            id: 0,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (products.length === 0) {
            newProduct.id = this.nextProductId;
        } else {
            const lastProduct = products[products.length - 1];
            newProduct.id = lastProduct.id + 1;
        }

        products.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        console.log('Producto agregado satisfactoriamente.');

        return newProduct;

    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        const foundProduct = products.find(product => product.id === parseInt(id));

        if (foundProduct) {
            console.log('Producto encontrado de id:', id, foundProduct);
            return foundProduct;
        } else {
            console.log('Error: No se encontró ningún producto con el ID ingresado.');
            return null;
        }

    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const productToDelete = await this.getProductById(id);

        if (productToDelete) {
            const updatedProducts = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
            console.log('Producto eliminado satisfactoriamente.');

        } else {
            console.log('Error: No se encontró ningún producto con el ID ingresado para eliminar.');
        }
    }

    updateProduct = async (id, updatedFields) => {
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
    }

}

export default productManager;

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
