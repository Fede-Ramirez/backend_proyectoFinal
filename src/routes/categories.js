const { Router } = require('express');
const { CategoryController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../controllers/users');

const router = new Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', isLoggedIn, isAdmin, CategoryController.createCategory);
router.put('/:id', isLoggedIn, isAdmin, CategoryController.updateCategory);
router.delete('/:id', isLoggedIn, isAdmin, CategoryController.deleteCategory);

module.exports = router;