const { ProductAPI } = require('../api');
const logger = require('../services/log4jsConfig');

//Controladores asociados a las rutas vinculadas a productos (se utiliza la Product API)

//Traer todos los productos
const getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductAPI.find();
        res.json({
            data: products,
        });
    } catch (error) {
        next(error);
    };
};

//Traer un producto según su ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductAPI.find(id);
    
        if (!product) {
            return res.status(404).json({ msg: 'El producto solicitado no existe' });
        } 
    
        res.json({
            data: product,
        });
    } catch (error) {
        next(error);
    };
};

//Traer productos filtrados por categoría
const getProductsByCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoryProducts = await ProductAPI.findByCategory(id);
        logger.info(categoryProducts);

        if (categoryProducts.length === 0) {
            return res.status(404).json({ msg: "Error: categoría sin productos o categoría inexistente" });
        }

        res.json({
            data: categoryProducts,
        });
    } catch (error) {
        next(error);
    }
}

//Crear un nuevo producto tomando los datos de los campos del nombre, descripción, stock, precio, imagen y ID de categoría
const createProduct = async (req, res, next) => {
    try {
        const { name, description, stock, price, image, categoryId } = req.body;
    
        if (!name || !description || !stock || !price || !image || !categoryId) {
            return res.status(400).json({ 
                msg: 'Error: parámetros inválidos' 
            });
        }
    
        const newProduct = {
            name,
            description,
            stock,
            price,
            image,
            categoryId,
        };
    
        const product = await ProductAPI.create(newProduct);
    
        res.json({
            msg: 'Producto creado con éxito',
            data: product,
        });
    } catch (error) {
        next(error);
    };
};

//Editar un producto tomando los nuevos datos del nombre, descripción, stock, precio e ID de categoría
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, stock, price, categoryId } = req.body;
    
        if (!name && !description && !stock && !price && !categoryId) {
            return res.status(400).json({ 
                msg: 'Error: parámetros inválidos' 
            });
        };
    
        const newData = {
            name,
            description,
            stock,
            price,
            categoryId,
        };
    
        const productUpdated = await ProductAPI.update(id, newData);
    
        res.json({
            msg: 'Producto actualizado con éxito',
            data: productUpdated,
        });
    } catch (error) {
        next(error);
    };
};

//Eliminar un producto tomando como referencia su ID
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductAPI.find(id);
    
        if (!product) {
            return res.status(404).json({ 
                msg: 'El producto que desea eliminar no existe' 
            });
        };
    
        await ProductAPI.remove(id);
    
        res.json({
            msg: 'Producto eliminado con éxito',
        });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
};