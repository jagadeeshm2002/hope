const express = require("express")
const router =express.Router()
const productController = require("../controllers/productController");
const verifyJWT = require("../middlewares/verifyJWT");
router.use(verifyJWT)
router.route('/')
    .get(productController.products)
    .post(productController.uploadProduct)


router.route('/:id')
    .get(productController.singleProduct)
    

// router.route("/product/:id")
//     .get(productController)

module.exports = router