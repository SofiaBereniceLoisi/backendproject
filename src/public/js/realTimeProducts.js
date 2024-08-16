import logger from "../../config/logConfig";

// (socket server del lado del cliente)
let socketClient = io();


// Prueba de conexion desde el front :)
document.addEventListener('DOMContentLoaded', () => {

    socketClient.emit('message', 'Cliente conectado!');
    logger.info('Client connected');

    // window.addEventListener('blur', () => {
    //     socketClient.disconnect();
    //     console.log('Client disconnected');
    // });

    // window.addEventListener('focus', () => {
        // socketClient = io();
    //     console.log('Client reconnected');
    // });

});

//FUNCION PARA AGREGAR A LA VISTA EL NUEVO PRODUCTO -----------------------------------

function updateProductsList(productsList) {
    
    const productsContainer = document.getElementById('productsAddedList');
    let productsHTML = '';
    

    productsList.forEach((product) => {
        let id = product._id
        productsHTML += `<div class="card" style="width: 25%;">
            <div class="card-body productCard">
                <h5 class="card-title"> ${product.title}</h5>
                <p class="card-text"> ${product.description}</p>
                <ul>
                    <li>Precio:$ ${product.price}</li>
                    <li>Stock: ${product.stock}</li>
                    <li>Categoría: ${product.category}</li>
                </ul>
                <button id="btnDeleteProduct" class="btn btn-secondary" onClick="deleteProduct('${id}')" data-id="${id}">Eliminar Producto</button>
            </div>
        </div>`
    });
    productsContainer.innerHTML = productsHTML
}


// ACTUALIZAR VISTA ---------------------------------------------    

socketClient.on('sendUpdatedList', (productsList) => {
    updateProductsList(productsList);
});


// AGREGAR PRODUCTO ---------------------------------------------   

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

    socketClient.emit('addProduct', { title, description, price, stock, code, category, status, thumbnails });
    logger.info({ title, description, price, stock, code, category })
    addProductForm.reset();
});


// ELIMINAR PRODUCTO----------------------------------------------------

function deleteProduct(id) {
    logger.info(`Trying to delete product of ID: ${id}`)
    socketClient.emit("deleteProduct", id);
}
