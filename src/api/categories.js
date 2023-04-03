const { CategoryModel } = require('../models');
const ProductsAPI = require('./products');
const { ApiError, ErrorStatus } = require('./errors');

//API para categorías, comunicación con la DB

//Traer todas las categorías de productos o una sola por su ID
const find = async (id) => {
    if (id) {
        const category = await CategoryModel.findById(id);
        return category
    };

    const category= await CategoryModel.find();
    return category
};

//Crear nueva categoría
const create = async(newCategory) => {
    const category = await CategoryModel.create(newCategory);
    return category;
};

//Editar una categoría
const update = async (id, data) => {
    await CategoryModel.findByIdAndUpdate(id, data, {new: true,});
}

//Eliminar categoría utilizando la API de productos
const remove = async (id) => {
    const productsWithCategory = await ProductsAPI.findByCategory(id);

    if (productsWithCategory.length > 0) {
        throw new ApiError(
        'No se puede eliminar la categoría porque hay productos dentro de la misma',
        ErrorStatus.BadRequest,
        );
    };

    await CategoryModel.findByIdAndDelete(id);
};

module.exports = {
    find,
    create,
    update,
    remove,
};
