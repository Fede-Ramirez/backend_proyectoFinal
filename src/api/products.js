const { ProductModel } = require('../models');

//API para productos, comunicación con la DB

//Traer todos los productos o uno solo pasandole el ID
const find = async(id) => {
    if (id) {
        const product = await ProductModel.findById(id);
        return product;
    } 
    
    const product = await ProductModel.find();
    return product;
};

//Traer productos filtrados por una categoría, pasandole el ID de la categoría
const findByCategory = async(categoryId) => {
    const product = await ProductModel.find({ categoryId });
    return product;
};

//Crear un nuevo producto
const create = async (newProduct) => {
    const product = await ProductModel.create(newProduct);
    return product;
};

//Editar un producto
const update = async (id, data) => {
    const product = await ProductModel.findByIdAndUpdate(id, data, {new: true,})
    return product;
}

//Eliminar un producto
const remove = async(id) => {
    await ProductModel.findByIdAndDelete(id);
};

//Aumentar el stock de un producto identificandolo mediante ID
const addStock = async (id, stock) => {
    const product = await find(id);

    product.stock += stock;

    await product.save();
};

//Disminuir el stock de un producto identificandolo mediante ID
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