document.addEventListener('DOMContentLoaded', () => {
    let socket;

    window.addEventListener('focus', () => {
        socket = io();
        socket.emit('message', 'Cliente conectado!');
        console.log('Client connected!');

        socket.on('productDeleted', (deletedProductId) => {
            // Eliminar el producto de la interfaz de usuario
            const productContainer = document.querySelector(`.product-item[data-id="${deletedProductId}"]`);
            if (productContainer) {
                productContainer.remove();
                console.log(`Producto con ID ${deletedProductId} eliminado de la vista`);
            } else {
                console.error(`Producto con ID ${deletedProductId} no encontrado en la interfaz de usuario.`);
            }
        });
    });

    window.addEventListener('blur', () => {
        if (socket) {
            socket.disconnect();
            console.log('Client disconnected')
            socket = null;
        }
    });

    const btnDeleteProduct = document.querySelectorAll('#btnDeleteProduct');

    btnDeleteProduct.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.dataset.id;
            console.log(`Intentando eliminar producto con ID ${productId}`);
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    console.log(`Producto con ID ${productId} eliminado correctamente`);
                    const productContainer = event.target.parentElement;
                    productContainer.remove();
                } else {
                    console.error(`Error al eliminar el producto con ID ${productId}`);
                }
            } catch (error) {
                console.error(`Error al eliminar el producto con ID ${productId}:`, error);
            }
        });
    });
});