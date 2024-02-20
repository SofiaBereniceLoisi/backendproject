import { Router } from "express";
const cartRouter = Router();

import CartManager from '../cartManager.js';
const cartsManager = new CartManager('./data/cart.json');

cartRouter.post("/api/carts", async (req, res) => {
    try {
        const newCart = await cartsManager.createCart();
        if (newCart) {
            res.status(201).send({ success: "Nuevo carrito creado con exito", cart: newCart });
        } else {
            res.status(500).send({ error: "No se pudo crear el carrito" });
        }
    } catch (error) {
        console.log("Error al crear el carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

cartRouter.get("/api/carts/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsManager.getCartById(cartId);
        if (cart) {
            res.status(200).send({ success: "Carrito encontrado", cart });
        } else {
            res.status(404).send({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        console.log("Error al obtener el carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

cartRouter.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1; //cantidad 1 por defecto si no se especifica.

        const updatedCart = await cartsManager.addProductToCart(cartId, productId, quantity);
        if (updatedCart) {
            res.status(200).send({ seccess: "Producto agregado al carrito correctamente", cart: updatedCart });
        } else {
            res.status(404).send({ error: "No se pudo agregar el producto al carrito: el carrito o el producto no existe." });
        }
    } catch (error) {
        console.log("Error al agregar el producto al carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

export default cartRouter;