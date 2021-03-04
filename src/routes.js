var express = require('express')
var router = express.Router()
var UserController = require('./controllers/UserController')

const userController = new UserController()

router.get('/users', userController.index)
router.get('/users/:id', userController.show)
router.post('/users', userController.store)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)

module.exports = router;