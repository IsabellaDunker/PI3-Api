var express = require('express')
var router = express.Router()
var UserController = require('./controllers/UserController')

const userController = new UserController()

router.get('/users', userController.get_all)
router.get('/users/:id', userController.get_one)
router.post('users', userController.create)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)

module.exports = router