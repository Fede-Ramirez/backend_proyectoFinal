const { Router } = require('express');
const AuthRouter = require('./auth');
const CategoriesRouter = require('./categories');
const ProductsRouter = require('./products');
const CartRouter = require('./cart');
const { isLoggedIn, } = require('../controllers/users');

const router = Router();

router.get('/hello', isLoggedIn, (req, res) => {
    res.json({ 
        msg: 'HOLA USUARIO', 
        session: req.session });
});

router.use('/auth', AuthRouter);
router.use('/categories', CategoriesRouter);
router.use('/products', ProductsRouter);
router.use('/cart', isLoggedIn, CartRouter);

module.exports = router;