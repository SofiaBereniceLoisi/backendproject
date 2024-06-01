import ProductManagerM from "../dao/mongoDB/productManagerM.js";
const productManagerM = new ProductManagerM();

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productManagerM.getAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productManagerM.getById(id);
        if (!product) {
            res.json({ msg: 'Producto no encontrado.' });
        } else {
            res.json(product);
        }
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productManagerM.create(req.body);
        if (!newProduct) {
            res.json({ msg: 'No se pudo crear el producto.' });
        } else {
            res.json(newProduct);
        }
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productManagerM.update(id, req.body);
        if (!updatedProduct) {
            res.json({ msg: 'No se pudo modificar el producto.' });
        } else {
            res.json(updatedProduct);
        }
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productManagerM.delete(id);
        if (!deletedProduct) {
            res.json({ msg: 'No se pudo eliminar el producto.' });
        } else {
            res.json(deletedProduct);
        }
    } catch (error) {
        next(error);
    }
}