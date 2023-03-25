const { Router } = require('express');
const { CartController } = require('../controllers');

const router = new Router();

router.get('/', CartController.getCart);
router.post('/add', CartController.addProduct);
router.post('/remove', CartController.deleteProduct);
router.post('/order', CartController.createOrder);

module.exports = router;