import { Server } from 'socket.io';
import ProductManager from './productManager.js';

const productManager = new ProductManager('./data/products.json');

const handleProductEvents = (socket, io) => {
    socket.on('productAdded', async (product) => {
        try {
            const addedProduct = await productManager.addProduct(product);
            io.emit('productAdded', addedProduct);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    });

    socket.on('productDeleted', async (productId) => {
        console.log(`Intentando eliminar producto con ID ${productId}`);
        try {
            const deletedProductId = await productManager.deleteProduct(productId);
            if (deletedProductId) {
                console.log(`Producto con ID ${deletedProductId} eliminado correctamente`);
                io.emit('productDeleted', deletedProductId);
            } else {
                console.error(`No se encontró el producto con ID ${productId}`);
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    });

    socket.on('productUpdated', async (updatedProduct) => {
        try {
            const updated = await productManager.updateProduct(updatedProduct.id, updatedProduct);
            if (updated) {
                io.emit('productUpdated', updated);
            }
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    });
};

const websocketManager = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Client connected!');
        
        socket.on('disconnect', () => {
            console.log('Client disconnected!');
        });
        handleProductEvents(socket, io);
    });

    return io;
};

export default websocketManager;

    