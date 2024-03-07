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


// ACTUALIZAR VISTA ---------------------------------------------    

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
                <button id="btnDeleteProduct" class="btn btn-secondary" onClick="deleteProduct(${product.id})" data-id="${product.id}">Eliminar Producto</button>
            </div>
        </div>`
    });
    productsContainer.innerHTML = productsHTML
}


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

    socket.emit('addProduct', { title, description, price, stock, code, category, status, thumbnails });
    console.log({ title, description, price, stock, code, category })
    addProductForm.reset();
});


// ELIMINAR PRODUCTO----------------------------------------------------

function deleteProduct(Id) {
    socket.emit("deleteProduct", Id);
}
