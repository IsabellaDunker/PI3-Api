var express = require('express')
var router = express.Router()
var UserController = require('./controllers/UserController')
var AuthController = require('./controllers/AuthController')
var EnvironmentController = require('./controllers/EnvironmentController')
var ProductController =  require('./controllers/ProductController')
var verifyJWT = require('./helpers/verifyJWT');

// login routes
router.post('/login', AuthController.login)
router.get('/logout', verifyJWT, AuthController.logout)
router.get('/renew', verifyJWT, AuthController.renew)

// users routes
router.get('/users', verifyJWT, UserController.index)
router.get('/users/:id', verifyJWT, UserController.show)
router.post('/users', verifyJWT, UserController.store)
router.put('/users/:id', verifyJWT, UserController.update)
router.delete('/users/:id', verifyJWT, UserController.delete)

// environments routes
router.post('/environments', verifyJWT, EnvironmentController.store)
router.get('/environments', verifyJWT, EnvironmentController.index)
router.get('/environments/:id', verifyJWT, EnvironmentController.show)
router.put('/environments/:id', verifyJWT, EnvironmentController.update)
router.delete('/environments/:id', verifyJWT, EnvironmentController.delete)

// products routes
router.post('/products', verifyJWT, ProductController.store)
router.get('/products', verifyJWT, ProductController.index)
router.get('/products/:id', verifyJWT, ProductController.show)
router.put('/products/:id', verifyJWT, ProductController.update)
router.delete('/products/:id', verifyJWT, ProductController.delete)

module.exports = router;