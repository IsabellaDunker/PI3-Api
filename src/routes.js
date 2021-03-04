var express = require('express')
var router = express.Router()
var UserController = require('./controllers/UserController')
var AuthController = require('./controllers/AuthController')
var verifyJWT = require('./helpers/verifyJWT');

// login routes
router.post('/login', AuthController.login)
router.get('/logout', verifyJWT, AuthController.logout)

// users routes
router.get('/users', verifyJWT, UserController.index)
router.get('/users/:id', verifyJWT, UserController.show)
router.post('/users', verifyJWT, UserController.store)
router.put('/users/:id', verifyJWT, UserController.update)
router.delete('/users/:id', verifyJWT, UserController.delete)

module.exports = router;