
import ProductManager from './persistence/dao/fileSystem/productManager.js';
const productManager = new ProductManager('./src/dao/fileSystem/data/products.json');
import MessageManagerM from './persistence/dao/mongoDB/messageManagerM.js';
const messageManagerM = new MessageManagerM();


export const websocketManager = (socketServer) => {
    //el socket del servidor escucha al socket del cliente:
    socketServer.on('connection', async (socket) => {
        console.log('Client connected!');
        const productsList = await productManager.getAll();
        socket.emit('sendUpdatedList', productsList);

        // Agregar producto --------------------------------------------------
        socket.on('addProduct', async (productData) => {
            console.log('Recibiendo el producto:', productData);
            try {
                await productManager.create(productData);
                const productsList = await productManager.getAll();
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
                await productManager.delete(Id);
                const productsList = await productManager.getAll();
                socket.emit('sendUpdatedList', productsList);
                console.log(`Producto con ID ${Id} eliminado correctamente`);
            } catch (error) {
                console.log('Error al eliminar producto:', error);
            }
        });

        // --------------- CHAT -------------------------
        socket.on('newUser', (user) => {
            console.log(`> ${user} ha iniciado sesión`);
        })

        socket.on('chat:message', async (msg) => {
            await messageManagerM.createMessage(msg);
            socketServer.emit('messages', await messageManagerM.getAllMessages());  
        })

        socket.on('chat:typing', (data) => {
            socket.broadcast.emit('chat:typing', data)
        });
        
        socket.on('disconnect', () => {
            console.log('Client disconnected!');
        });

    });

};
