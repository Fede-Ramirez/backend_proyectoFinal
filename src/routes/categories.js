const { Router } = require('express');
const { CategoryController } = require('../controllers');

const router = new Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;