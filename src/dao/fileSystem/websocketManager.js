
import ProductManager from './productManager.js';
const productManager = new ProductManager('./src/dao/fileSystem/data/products.json');

export const websocketManager = (socketServer) => {
    //el socket del servidor escucha al socket del cliente:
    socketServer.on('connection', async (socket) => {
        console.log('Client connected!');
        const productsList = await productManager.getProducts();
        socket.emit('sendUpdatedList', productsList);

        // Agregar producto --------------------------------------------------
        socket.on('addProduct', async (productData) => {
            console.log('Recibiendo el producto:', productData);
            try {
                await productManager.addProduct(productData);
                const productsList = await productManager.getProducts();
                socket.emit('sendUpdatedList', productsList);
                console.log('Producto agregado correctamente:', productData);

            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        });

    // Eliminar producto --------------------------------------------------- 
        socket.on('deleteProduct', async (Id) => {
            console.log(`Intentando eliminar producto con ID ${Id}`);
            try {
                await productManager.deleteProduct(Id);
                const productsList = await productManager.getProducts();
                socket.emit('sendUpdatedList', productsList);
                console.log(`Producto con ID ${Id} eliminado correctamente`);
            } catch (error) {
                console.log('Error al eliminar producto:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected!');
        });

    });
};
