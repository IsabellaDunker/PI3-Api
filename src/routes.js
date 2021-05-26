var express = require('express');
var router = express.Router();
var UserController = require('./controllers/UserController');
var AuthController = require('./controllers/AuthController');
var EnvironmentController = require('./controllers/EnvironmentController');
var ProductController =  require('./controllers/ProductController');
var OrderController = require('./controllers/OrderController');
var TabController = require('./controllers/TabController');
var verifyJWT = require('./helpers/verifyJWT');

// login routes
router.post('/login', AuthController.login);
router.get('/logout', verifyJWT, AuthController.logout);
router.get('/renew', verifyJWT, AuthController.renew);

// users routes
router.get('/users', verifyJWT, UserController.index);
router.get('/users/:id', verifyJWT, UserController.show);
router.post('/users', verifyJWT, UserController.store);
router.put('/users/:id', verifyJWT, UserController.update);
router.delete('/users/:id', verifyJWT, UserController.delete);

// environments routes
router.post('/environments', verifyJWT, EnvironmentController.store);
router.get('/environments', verifyJWT, EnvironmentController.index);
router.get('/environments/:id', verifyJWT, EnvironmentController.show);
router.put('/environments/:id', verifyJWT, EnvironmentController.update);
router.delete('/environments/:id', verifyJWT, EnvironmentController.delete);

// products routes
router.post('/products', verifyJWT, ProductController.store);
router.get('/products', verifyJWT, ProductController.index);
router.get('/products/:id', verifyJWT, ProductController.show);
router.put('/products/:id', verifyJWT, ProductController.update);
router.delete('/products/:id', verifyJWT, ProductController.delete);

// orders routes
router.post('/orders', verifyJWT, OrderController.store);
router.get('/orders', verifyJWT, OrderController.index);
router.get('/orders/:id', verifyJWT, OrderController.show);
router.put('/orders/:id', verifyJWT, OrderController.update);
router.delete('/orders/:id', verifyJWT, OrderController.delete);
router.get('/reports/waiter', verifyJWT, OrderController.reportsWaiter)
router.get('/reports/product', verifyJWT, OrderController.reportsProduct)
router.get('/reports/date', verifyJWT, OrderController.reportsDate)
// tabs routes
router.post('/tabs', verifyJWT, TabController.store);
router.get('/tabs', verifyJWT, TabController.index);
router.get('/tabs/:id', verifyJWT, TabController.show);
router.put('/tabs/:id', verifyJWT, TabController.update);
router.delete('/tabs/:id', verifyJWT, TabController.delete);

module.exports = router;