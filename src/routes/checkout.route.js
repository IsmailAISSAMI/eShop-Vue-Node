const express = require('express');
const router = express.Router();
const checkout_controller = require('../controllers/checkout.controller');

router.post('/create-checkout-session', checkout_controller.checkout);

module.exports = router;