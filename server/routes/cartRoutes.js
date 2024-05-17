const express = require("express");
const router = express.Router();
const cartContoller = require("../controllers/cartController");


router.route('/')
    .get(cartContoller.getCartItems)

router.route('/add')
    .post(cartContoller.addToCart)


module.exports = router