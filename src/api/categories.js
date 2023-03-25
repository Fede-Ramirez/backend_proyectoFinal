const { CategoryModel } = require('../models');
const ProductsAPI = require('./products');
const { ApiError, ErrorStatus } = require('./errors');

const find = async (id) => {
    if (id) {
        const category = await CategoryModel.findById(id);
        return category
    };

    const category= await CategoryModel.find();
    return category
};

const create = async(newCategory) => {
    const category = await CategoryModel.create(newCategory);
    return category;
};

const update = async (id, data) =>
    await CategoryModel.findByIdAndUpdate(id, data, {
        new: true,
});

const remove = async (id) => {
    const productsWithCategory = await ProductsAPI.findByCategory(id);

    if (productsWithCategory.length > 0) {
        throw new ApiError(
        'No se puede eliminar la categoría porque hay productos dentro de la misma',
        ErrorStatus.BadRequest,
        );
    };

    CategoryModel.findByIdAndDelete(id);
};

module.exports = {
    find,
    create,
    update,
    remove,
};
