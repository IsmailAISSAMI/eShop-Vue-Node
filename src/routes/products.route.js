const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
const productSchemaValidation = require('../middlewares/validators/products.validator');

//route qui nécessite une authorisation pour les users de type admin (dans le cas où on ferait un back office)
router.post('/products' ,product.create);
router.patch('/products/:id', productSchemaValidation, product.update);
router.delete('/products/:id', product.delete)
// Sans authorisation:
router.get('/products/', product.getProducts);
router.get('/products/:id', product.getProduct);

module.exports = router;