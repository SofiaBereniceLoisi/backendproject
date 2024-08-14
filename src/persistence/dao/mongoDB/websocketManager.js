
import ProductManagerM from './productManagerM.js';
const productManager = new ProductManagerM();
import MessageManagerM from './messageManagerM.js';
const messageManagerM = new MessageManagerM();


export const websocketManager = (socketServer) => {
    //el socket del servidor escucha al socket del cliente:
    socketServer.on('connection', async (socket) => {
        console.log('Client connected!');
        const result = await productManager.getAll();
        const productsList = result.docs; 
        socketServer.emit('sendUpdatedList', productsList);

        // Agregar producto --------------------------------------------------
        socket.on('addProduct', async (productData) => {
            console.log('Recibiendo el producto:', productData);
            try {
                await productManager.create(productData);
                const result = await productManager.getAll();
                const productsList = result.docs;
                socketServer.emit('sendUpdatedList', productsList);
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
                const result = await productManager.getAll();
                const productsList = result.docs;
                socketServer.emit('sendUpdatedList', productsList);
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
