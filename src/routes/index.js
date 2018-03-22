const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/products/:asin', ProductController);

module.exports = router;