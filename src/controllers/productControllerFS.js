import * as serviceFS from "../services/productServices.js";


export const getAll = async (req, res, next) => {
    try {
        const { limit } = req.query;
        let products = await serviceFS.getAll();

        if (limit) {
            products = products.slice(0, parseInt(limit));
        }

        res.send(JSON.stringify(products));

    } catch (error) {
        console.log('Error al obtener productos: ', error);
        res.status(500).send({ error: 'Error al obtener productos' });
    }
}

export const getById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await serviceFS.getById(productId);

        if (product) {
            res.send(JSON.stringify(product));
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log('Error al obtener producto:', error);
        res.status(500).send({ error: 'Error al obtener producto' });
    }
}

export const create = async (req, res, next) => {
    try {
        const productData = req.body;
        const addedProduct = await serviceFS.create(productData);

        res.status(201).send(addedProduct);

    } catch (error) {
        console.log('Error al agregar producto:', error);
        res.status(500).send({ error: 'Error al agregar producto' });
    }
}

export const update = async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const updatedFields = req.body;

        const updatedProduct = await serviceFS.update(productId, updatedFields);

        if (updatedProduct) {
            res.status(200).send({ success: "Producto actualizado correctamente", product: updatedProduct });
        } else {
            res.status(404).send({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.log("Error al actualizar producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
}

export const remove = async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);

        const deletedProduct = await serviceFS.delete(productId);

        if (deletedProduct) {
            res.status(200).send({ success: "Producto eliminado correctamente" });
        } else {
            res.status(404).send({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.log("Error al eliminar producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
}