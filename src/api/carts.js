const { CartModel } = require('../models');
const NotificationService  = require('../services/notifications');
const ProductsAPI = require('./products');
const { ApiError, ErrorStatus } = require('./errors');

const create = async(userId) => {
    const cart = await CartModel.create({ userId });
    return cart;
};

const getCartByUser = async(userId) => {
    const cart = await CartModel.findOne({ userId });
    return cart;
};

const addProduct = async (cartId, productId, items) => {
    const product = await ProductsAPI.find(productId);

    if (!product) {
        throw new ApiError('Error: el producto que desea agregar no existe', ErrorStatus.BadRequest);
    };

    if (!product.stock || items > product.stock) {
        throw new ApiError('Lo lamentamos, actualmente no contamos con stock disponible para este producto', ErrorStatus.BadRequest);
    };

    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito no existe', ErrorStatus.BadRequest);
    }; 

    const index = cart.products.findIndex(
        (aProduct) => aProduct.productId == productId,
    );

    if (index < 0) {
        const newProductItem = {
            productId: productId,
            items: Number(items),
        };
        cart.products.push(newProductItem);
    } else { 
        cart.products[index].items += items;
    };

    await cart.save();

    await ProductsAPI.removeStock(productId, items);

    return cart;
};

const deleteProducts = async (cartId, productId, items) => {
    const product = await ProductsAPI.find(productId);

    if (!product) {
        throw new ApiError('Error: el producto no existe', ErrorStatus.BadRequest);
    };

    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito no existe', ErrorStatus.BadRequest);
    };

    const index = cart.products.findIndex(
        (aProduct) => aProduct.productId == productId,
    );

    if (index < 0) {
        throw new ApiError('Error: el producto a eliminar no existe', ErrorStatus.BadRequest);
    };

    if (!items || cart.products[index].items <= items) {
        await ProductsAPI.addStock(productId, cart.products[index].items);
        cart.products.splice(index, 1);
    } else {
        await ProductsAPI.addStock(productId, items);
        cart.products[index].items -= items;
    };

    await cart.save();

    return cart;
};

const emptyCart = async (cartId) => {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito a vaciar no existe', ErrorStatus.BadRequest);
    } 

    cart.products = [];
    await cart.save();

    return cart;
};

const createOrder = async (cartId) => {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito no existe', ErrorStatus.BadRequest);
    };

    if (!cart.products.length) {
        throw new ApiError(
        'Error: no puedes crear una orden con el carrito vacío',
        ErrorStatus.BadRequest,
        );
    };

    await NotificationService.notifyNewOrderByEmail(cart);

    await emptyCart(cartId);
};

module.exports = {
    create,
    addProduct,
    deleteProducts,
    getCartByUser,
    emptyCart,
    createOrder,
};