
import ProductManagerM from './productManagerM.js';
const productManager = new ProductManagerM();
import MessageManagerM from './messageManagerM.js';
import logger from '../../../config/logConfig.js';
const messageManagerM = new MessageManagerM();


export const websocketManager = (socketServer) => {
    //el socket del servidor escucha al socket del cliente:
    socketServer.on('connection', async (socket) => {
        logger.info('Client connected!');
        const result = await productManager.getAll();
        const productsList = result.docs; 
        socketServer.emit('sendUpdatedList', productsList);

        // Agregar producto --------------------------------------------------
        socket.on('addProduct', async (productData) => {
            logger.debug('Receiving product: ', productData);
            try {
                await productManager.create(productData);
                const result = await productManager.getAll();
                const productsList = result.docs;
                socketServer.emit('sendUpdatedList', productsList);

                logger.info('Producto added correctly: ', productData);

            } catch (error) {
                logger.error('Error adding product: ', error);
            }
        });

        // Eliminar producto --------------------------------------------------- 
        socket.on('deleteProduct', async (Id) => {
            logger.debug(`Trying to delete product of ID ${Id}`);
            try {
                await productManager.delete(Id);
                const result = await productManager.getAll();
                const productsList = result.docs;
                socketServer.emit('sendUpdatedList', productsList);
                logger.info(`Product of ID ${Id} deleted correctly`);
            } catch (error) {
                logger.error('Error deleting product:', error);
            }
        });

        // --------------- CHAT -------------------------
        socket.on('newUser', (user) => {
            logger.info(`> ${user} logged in`);
        })

        socket.on('chat:message', async (msg) => {
            await messageManagerM.createMessage(msg);
            socketServer.emit('messages', await messageManagerM.getAllMessages());  
        })

        socket.on('chat:typing', (data) => {
            socket.broadcast.emit('chat:typing', data)
        });
        
        socket.on('disconnect', () => {
            logger.info('Client disconnected!');
        });

    });

};
