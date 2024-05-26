const express = require("express");
const router = express.Router();
const cartContoller = require("../controllers/cartController");
const verifyJWT = require("../middlewares/verifyJWT");
const rateLimiter = require("../middlewares/rateLimiter")

router.use(verifyJWT)
router.route('/')
    .get(rateLimiter,cartContoller.getCartItems)

router.route('/add')
    .post(rateLimiter,cartContoller.addToCart)

router.route('/remove/:id')
    .delete(rateLimiter,cartContoller.removeFromCart)
module.exports = router