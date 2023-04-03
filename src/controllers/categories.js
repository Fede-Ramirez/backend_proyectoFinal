const { CategoryAPI } = require('../api');

//Controladores para las rutas vinculadas a las categorías, (se utiliza la CategoryAPI)

//Traer todas las categorías
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryAPI.find();
        res.json(categories);
    } catch (error) {
        next(error);
    };
};

//Traer categoría por ID tomado como parámetro
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await CategoryAPI.find(id);
    
        if (!category) {
            return res.status(404).json({ 
                msg: 'Lo siento, no contamos con esa categoría de productos' 
            });
        };
    
        res.json({
            data: category,
        });
    } catch (error) {
        next(error);
    };
};

//Crear una categoría tomando como datos el nombre y la descripción
const createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
    
        if (!name || !description) {
            return res.status(400).json({ 
                msg: 'Error: parámetros inválidos' 
            });
        }
    
        const newCategory = {
            name,
            description,
        };
    
        const category = await CategoryAPI.create(newCategory);
    
        res.json({
            msg: 'Categoría creada con éxito',
            data: category,
        });
    } catch (error) {
        next(error);
    };
};

//Editar una categoría tomando como datos el nombre y la descripción
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
    
        if (!name || !description) {
            return res.status(400).json({ msg: 'Error: parámetros inválidos' });
        }
    
        const newData = {
            name,
            description,
        };
    
        const categoryUpdated = await CategoryAPI.update(id, newData);
    
        res.json({
            msg: 'Categoría actualizada con éxito',
            data: categoryUpdated,
        });
    } catch (error) {
        next(error);
    };
};

//Eliminar una categoría tomando como parámetro el ID de la misma
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await CategoryAPI.find(id);
    
        if (!category) {
            return res.status(404).json({ 
                msg: 'Error: no se puede eliminar una categoría que no existe' 
            });
        } 
    
        await CategoryAPI.remove(id);
    
        res.json({
            msg: 'Categoría eliminada con éxito',
        });
    } catch (error) {
        next(error);
    };
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};