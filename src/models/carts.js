const mongoose = require('mongoose');
const { productsCollectionName } = require('./products');
const { userCollectionName } = require('./users');

const cartCollectionName = 'cart';

const productItem = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: productsCollectionName,
            required: true,
        },
        items: { type: Number, default: 1 },
    },
    { _id: false },
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: userCollectionName,
            required: true,
        },
        products: [productItem],
    },
    { versionKey: false, timestamps: true },
);

const CartModel = mongoose.model(
    cartCollectionName, 
    cartSchema
);

module.exports = {
    cartCollectionName,
    CartModel
}