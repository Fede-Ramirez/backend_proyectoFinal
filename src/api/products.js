const { ProductModel } = require('../models');

const find = async(id) => {
    if (id) {
        const product = await ProductModel.findById(id);
        return product;
    } 
    
    const product = await ProductModel.find();
    return product;
};

const findByCategory = async(categoryId) => {
    const product = await ProductModel.find({ categoryId });
    return product;
};

const create = async (newProduct) => {
    const product = await ProductModel.create(newProduct);
    return product;
};

const update = async (id, data) => {
    const product = await ProductModel.findByIdAndUpdate(id, data, {new: true,})
    return product;
}

const remove = async(id) => {
    await ProductModel.findByIdAndDelete(id);
};

const addStock = async (id, stock) => {
    const product = await find(id);

    product.stock += stock;

    await product.save();
};

const removeStock = async (id, stock) => {
    const product = await find(id);

    if (product.stock < stock) {
        product.stock = 0;
    } 
    else {
        product.stock -= stock;
    } 

    await product.save();
};

module.exports = {
    find,
    create,
    update,
    remove,
    findByCategory,
    addStock,
    removeStock,
};