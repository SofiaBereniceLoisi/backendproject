// (socket server del lado del cliente)
let socket = io();

document.addEventListener('DOMContentLoaded', () => {

    socket.emit('message', 'Cliente conectado!');
    console.log('Client connected');

    window.addEventListener('blur', () => {
        socket.disconnect();
        console.log('Client disconnected');
    });

    window.addEventListener('focus', () => {
        socket = io();
        console.log('Client reconnected');
    });

});

// ELIMINAR PRODUCTO----------------------------------------------------
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

                socket.emit('productDeleted', productId);
            } else {
                console.error(`Error al eliminar el producto con ID ${productId}`);
            }
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${productId}:`, error);
        }
    });
});

socket.on('productDeleted', (deletedProductId) => {
    const productContainer = document.querySelector(`div[data-id="${deletedProductId}"]`);
    if (productContainer) {
        productContainer.remove();
        console.log(`Producto con ID ${deletedProductId} eliminado de la vista`);
    } else {
        console.error(`Producto con ID ${deletedProductId} no encontrado en la interfaz de usuario.`);
    }
});

// AGREGAR PRODUCTO---------------------------------------------    

socket.on('sendUpdatedList', (productsList) => {
    updateProductsList(productsList);
});

function updateProductsList(productsList) {

    const productsContainer = document.getElementById('productsAddedList');
    let productsHTML = '';

    productsList.forEach((product) => {
        productsHTML += `<div class="card" style="width: 25%;">
            <div class="card-body productCard">
                <h5 class="card-title"> ${product.title}</h5>
                <p class="card-text"> ${product.description}</p>
                <ul>
                    <li>Precio: ${product.price}</li>
                    <li>Stock: ${product.stock}</li>
                    <li>Categoría: ${product.category}</li>
                </ul>
                <button id="btnDeleteProduct" class="btn btn-secondary" data-id="${product.id}">Eliminar Producto</button>
            </div>
        </div>`
    });
    productsContainer.innerHTML = productsHTML
}

let addProductForm = document.getElementById('addProductForm');

addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let status;
    let thumbnails;
    let title = addProductForm.elements.title.value;
    let description = addProductForm.elements.description.value;
    let price = parseFloat(addProductForm.elements.price.value);
    let stock = parseInt(addProductForm.elements.stock.value);
    let code = addProductForm.elements.code.value;
    let category = addProductForm.elements.category.value;

    socket.emit('addProduct', { title, description, price, stock, code, category, status, thumbnails });
    console.log({ title, description, price, stock, code, category })
    addProductForm.reset();
});






