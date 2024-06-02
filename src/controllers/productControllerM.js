import * as service from "../services/productServices.js";

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        next(error.message);
    }
}

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.getById(id);
        if (!product) {
            res.status(404).json({ msg: 'Producto no encontrado.' });
        } else {
            res.json(product);
        }
    } catch (error) {
        next(error);
    }
}

export const create = async (req, res, next) => {
    try {
        const newProduct = await service.create(req.body);
        if (!newProduct) {
            res.status(404).json({ msg: 'No se pudo crear el producto.' });
        } else {
            res.json(newProduct);
        }
    } catch (error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await service.update(id, req.body);
        if (!updatedProduct) {
            res.status(404).json({ msg: 'No se pudo modificar el producto.' });
        } else {
            res.json(updatedProduct);
        }
    } catch (error) {
        next(error);
    }
}

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await service.delete(id);
        if (!deletedProduct) {
            res.status(404).json({ msg: 'No se pudo eliminar el producto.' });
        } else {
            res.json(deletedProduct);
        }
    } catch (error) {
        next(error);
    }
}