const { CartAPI,  } = require('../api');
const { ApiError, ErrorStatus } = require('../api/errors');

//Controladores para las rutas vinculadas al carrito (se utiliza la CartAPI)

//Traer un carrito según el usuario logueado
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

//Agregar un producto tomando como datos el ID del producto y la cantidad a comprar
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

//Eliminar productos teniendo en cuenta el ID del producto y la cantidad a eliminar
const deleteProduct = async (req, res, next) => {
    try {
        const { user } = req;
        const { productId, amount } = req.body;
    
        if (!productId) {
            throw new ApiError('Error: parámetros inválidos, ingresé un ID de producto correcto', ErrorStatus.BadRequest);
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

//Generar una orden de compra con envío de mail de aviso incluído
const createOrder = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await CartAPI.getCartByUser(user._id);
    
        await CartAPI.createOrder(cart._id);
    
        res.json({
            msg: 'Su orden ha sido creada y envíada con éxito, en breve nos pondremos en contacto',
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