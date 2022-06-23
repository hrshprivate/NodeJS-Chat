const Router = require('express').Router
const userController = require('../controllers/user')
const chatController = require('../controllers/chat')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth')

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/message', chatController.post_messages)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.get('/message', chatController.get_messages)

module.exports = router
