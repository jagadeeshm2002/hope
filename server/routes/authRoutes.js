const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

const rateLimiter = require('../middlewares/rateLimiter')

router.route('/')
    .post(rateLimiter,authController.login)

router.route('/register')
    .post(authController.register)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)


module.exports = router
