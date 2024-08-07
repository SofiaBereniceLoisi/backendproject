import Controllers from "./mainController.js";
import ProductService from "../services/productServices.js";
const productService = new ProductService;

export default class ProductController extends Controllers{
    constructor(){
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
            
            //para mensaje de bienvenida
            const first_name = await req.user.first_name;
            
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
                first_name: first_name, // le paso el nombre a la vista principal de productos
            });
        } catch (error) {
            next(error.message);
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
                    description: product.description
                });
            }
        } catch (error) {
            next(error);
        }
    }

}
