var express = require('express')
var router = express.Router()
var UserController = require('./controllers/UserController')
var AuthController = require('./controllers/AuthController')

// login routes
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)

// users routes
router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)

module.exports = router;