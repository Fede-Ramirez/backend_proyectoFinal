const { ProductAPI } = require('../api');
const logger = require('../services/log4jsConfig');

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

const getProductsByCategory = async (req, res, next) => {
    try {
        /*const idCategory = req.params.categoryId;
        const products = await ProductAPI.find();
        logger.info(products);

        const categoryProducts = products.filter(categoryId => categoryId === idCategory);
    
        if (!categoryProducts) {
            return res.status(404).json({ msg: 'Error: categoría sin productos o categoría inexistente' });
        };
    
        res.json({
            data: categoryProducts,
        });*/
            const { id } = req.params;

            const categoryProducts = await ProductAPI.findByCategory(id);
            logger.info(categoryProducts);

            if (!categoryProducts) {
                return res.status(404).json({ msg: "Error: categoría sin productos o categoría inexistente" });
            }

            res.json({
                data: categoryProducts,
            });
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    try {
        const { name, description, stock, price, categoryId } = req.body;
    
        if (!name || !description || !stock || !price || !categoryId) {
            return res.status(400).json({ 
                msg: 'Error: parámetros inválidos' 
            });
        }
    
        const newProduct = {
            name,
            description,
            stock,
            price,
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