import Controllers from "./mainController.js";
import ProductService from "../services/productServices.js";
import UserService from "../services/userService.js";
import * as productServices from "../services/productServices.js"
import logger from "../config/logConfig.js";
import { HttpResponse } from "../utils/httpResponse.js";
import { sendMailProductDeleted } from "../services/mailingService.js";
const httpResponse = new HttpResponse();
const productService = new ProductService();
const userService = new UserService();

export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    }

    getAll = async (req, res, next) => {
        try {
            // paginate ----- 
            const { page, limit, title, sort } = req.query;
            const response = await productService.getAll(page, limit, title, sort);

            const products = response.docs.map(product => ({
                id: product._id.toString(),
                title: product.title,
                price: product.price
            }));

            const next = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
            const prev = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;

            //para mensaje de bienvenida y botones
            const first_name = await req.user.first_name;
            const role = await req.user.role;
            const cartId = await req.user.cart._id;

            res.render('products', {
                products: products,
                info: {
                    count: response.totalDocs,
                    totalPages: response.totalPages,
                    nextLink: next,
                    prevLink: prev,
                    hasPrevPage: response.hasPrevPage,
                    hasNextPage: response.hasNextPage
                },
                role: role,
                first_name: first_name,
                cart: cartId
            });
        } catch (error) {
            logger.error('Error getting all products: ', error);
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await productService.getById(id);
            if (!product) {
                res.status(404).render('productDetail', { error: 'Producto no encontrado.' });
            } else {
                res.render('productDetail', {
                    id: product._id.toString(),
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    code: product.code,
                    stock: product.stock
                });
            }
        } catch (error) {
            logger.error('Error getting product by id: ', error);
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            let owner;
            if (req.user.role === 'admin') {
                owner = 'admin';
            } else if (req.user.role === 'premium') {
                owner = req.user.email;
            }

            const data = await productService.create({ ...req.body, owner });
            if (!data) {
                return httpResponse.NotFound(res, data);
            } else {
                return httpResponse.Created(res, data);
            }
        } catch (error) {
            logger.error('Error creating product: ', error);
            next(error);
        }
    };

    update = async (req, res, next) => {
        const { id } = req.body;
        const userEmail = req.user.email;
        const userRole = req.user.role;
        const updatedProductData = req.body;

        try {
            const product = await productService.getById(id);

            if (!product) {
                return httpResponse.NotFound(res, 'Product not found');
            }

            if (userRole === 'admin' || userEmail === product.owner) {
                await productService.update(id, updatedProductData);
                return httpResponse.Ok(res, `Producto con ID ${id} actualizado correctamente`);
            } else {
                return httpResponse.Forbidden(res, 'No tiene permisos para modificar este producto');
            }

        } catch (error) {
            logger.error('Error updating product: ', error);
            return httpResponse.InternalServerError(res, 'Error actualizando producto');
        }
    };

    delete = async (req, res, next) => {
        const { id } = req.params;
        const userEmail = req.user.email;
        const userRole = req.user.role;

        try {
            const product = await productService.getById(id);
            if (!product) {
                return httpResponse.NotFound(res, 'Product not found');
            }

            if (userRole === 'admin' || userEmail === product.owner) {
                await productService.delete(id);
                if (product.owner !== 'admin') {
                    const owner = await userService.getByEmail(product.owner);
                    if (owner && owner.role === 'premium') {
                        await sendMailProductDeleted(owner.first_name, owner.email, product.title);
                    }
                }
                return httpResponse.Ok(res, `Product with ID ${id} deleted successfully`);
            } else {
                return httpResponse.Forbidden(res, 'No tiene permisos para eliminar este producto');
            }

        } catch (error) {
            logger.error('Error deleting product: ', error);
            return next(error)
        }
    }

    showProductsListToAdmin = async (req, res, next) => {
        try {
            const prods = await productService.getAll(1,1000); //le paso numeros altos para que no me ponga limites en la paginacion
            let products = prods.docs;
            if (req.user.role === 'premium') {
                // Filtramos los productos cuyo owner es el usuario premium
                products = products.filter(product => product.owner === req.user.email);
            }
            const productList = products.map(product => {
                return {
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    category: product.category,
                    code: product.code,
                    owner: product.owner,
                    _id: product._id,
                };
            });
            const user = req.user.email
            const userRole = req.user.role
            res.render('productsAdmin', { products: productList , user, userRole});
        } catch (error) {
            next(error);
        }
    };
}

//MOCKING PRODS ---------------------------------------------------------
export const createProd = async (req, res) => {
    try {
        const { cant } = req.query;
        const response = await productServices.createProdMock(cant || 50)
        res.json(response);
    } catch (error) {
        logger.error('Error creating mocking products: ', error);
    }
}

export const getProds = async (req, res) => {
    try {
        res.json(await productServices.getProds());
    } catch (error) {
        logger.error('Error getting mocking products:', error);
    }
}