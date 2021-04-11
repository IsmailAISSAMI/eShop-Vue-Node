const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const userSchemaValidation = require('../middlewares/validators/users.validator');

// Toutes ces routes nécessitent une autorisation
//  -Auth
router.post('/users/login', user.login);
//  -CRUD
router.post('/users', userSchemaValidation ,user.create);
router.get('/users/:id', verifyToken,user.findOne);
router.get('/users', verifyToken,user.getUsers);
router.patch('/users/:id', userSchemaValidation, user.update);
router.delete('/users/:id', user.delete)

module.exports = router;