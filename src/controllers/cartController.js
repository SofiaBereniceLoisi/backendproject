import * as service from '../services/cartService.js'

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id);
    if (!response) {
      res.status(404).json({ msg: "El carrito no fue encontrado." });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newCart = await service.create();
    if (!newCart) {
      res.status(404).json({ msg: "Error creando el carrito" });
    } else {
      res.status(200).json(newCart);
    }
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartUpdated = await service.update(id, req.body);
    if (!cartUpdated) {
      res.status(404).json({ msg: "No se pudo actualizar el carrito." });
    }else {
      res.status(200).json(cartUpdated);
    }
  } catch (error) {
    next(error.message);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartDeleted = await service.remove(id);
    if (!cartDeleted) res.status(404).json({ msg: "Error eliminando el carrito." });
    else res.status(200).json({ msg: `Carrito de id: ${id} eliminado correctamente.` });
  } catch (error) {
    next(error.message);
  }
};

export const addProdToCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const newProdToUserCart = await service.addProdToCart(
      cid,
      pid,
    );
    if (!newProdToUserCart) res.json({ msg: "El producto o el carrito no existe." });
    else res.json(newProdToUserCart);
  } catch (error) {
    next(error.message);
  }
};

export const removeProdToCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const delProdToUserCart = await service.removeProdToCart(
      cid,
      pid,
    );
    if (!delProdToUserCart) res.json({ msg: "El producto o el carrito no existe." });
    else res.json({ msg: `El producto de id: ${pid} fue eliminado del carrito correctamente.` });
  } catch (error) {
    next(error.message);
  }
};

export const updateProdQuantityToCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    const updateProdQuantity = await service.updateProdQuantityToCart(
      cid,
      pid,
      quantity
    );
    if (!updateProdQuantity) res.json({ msg: "Error actualizando la cantidad del producto al carrito." });
    else res.json(updateProdQuantity);
  } catch (error) {
    next(error.message);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const clearCart = await service.clearCart(
      cid,
    );
    if (!clearCart) res.json({ msg: "Error vaciando el carrito." });
    else res.json(clearCart);
  } catch (error) {
    next(error.message);
  }
};