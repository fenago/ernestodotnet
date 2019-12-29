var express = require('express');
var router = express.Router();

const ctrlHome = require('../controllers/home');
const ctrlAuth = require('../controllers/auth');
const ctrlDashboard = require('../controllers/dashboard');
const ctrlProduct = require('../controllers/product');


router.get('/', ctrlHome.index);

router.get('/dashboard', ctrlDashboard.index);

router.get('/products', ctrlProduct.index);
router.post('/products/deploy', ctrlProduct.deploy);
router.get('/products/detail', ctrlProduct.detail);

module.exports = router;