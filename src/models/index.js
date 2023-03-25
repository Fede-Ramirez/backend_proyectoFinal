const { CartModel } = require('./carts');
const { UserModel } = require('./users');
const { ProductModel } = require('./products');
const { CategoryModel } = require('./categories');

module.exports = { 
    UserModel, 
    CartModel, 
    ProductModel, 
    CategoryModel
};