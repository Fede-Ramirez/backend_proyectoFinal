const { Router } = require('express');
const { ProductController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../controllers/users');

const router = new Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/category/:id', ProductController.getProductsByCategory);
router.post('/', isLoggedIn, isAdmin, ProductController.createProduct);
router.put('/:id', isLoggedIn, isAdmin, ProductController.updateProduct);
router.delete('/:id', isLoggedIn, isAdmin, ProductController.deleteProduct);

module.exports = router;