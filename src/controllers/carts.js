const { CartAPI,  } = require('../api');
const { ApiError, ErrorStatus } = require('../api/errors');

const getCart = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await CartAPI.getCartByUser(user._id);
    
        res.json({
            data: cart,
        });
    } catch (error) {
        next(error);
    };
};

const addProduct = async (req, res, next) => {
    try {
        const { user } = req;
        const { productId, amount } = req.body;
    
        if (!productId || !amount) {
            throw new ApiError('Error: parámetros inválidos', ErrorStatus.BadRequest);
        }
    
        const cart = await CartAPI.getCartByUser(user._id);
        const result = await CartAPI.addProduct(cart._id, productId, amount);
    
        res.json({ 
            msg: 'Producto agregado con éxito', 
            data: result 
        });
    } catch (error) {
        next(error);
    };
};

const deleteProduct = async (req, res, next) => {
    try {
        const { user } = req;
        const { productId, amount } = req.body;
    
        if (!productId) {
            throw new ApiError('Error: parámetros inválidos', ErrorStatus.BadRequest);
        }
    
        const cart = await CartAPI.getCartByUser(user._id);
        const result = await CartAPI.deleteProducts(cart._id, productId, amount);
    
        res.json({ 
            msg: 'Producto eliminado con éxito', 
            data: result 
        });
    } catch (error) {
        next(error);
    };
};

const createOrder = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await CartAPI.getCartByUser(user._id);
    
        await CartAPI.createOrder(cart._id);
    
        res.json({
            msg: 'Su orden ha sido creada con éxito',
        });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    getCart,
    addProduct,
    deleteProduct,
    createOrder,
};