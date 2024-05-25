const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/").get(usersController.getUserInfo);

router.route("/edit").put(usersController.editUserInfo);

router.route("/address/:userId")
.get(usersController.getAddresses)
.post(usersController.addAddress)

router.route("/address/:userId/:addressId")
.get(usersController.getSingleAddress)
.put(usersController.editAddress)
.delete(usersController.deleteAddress)

router.route("/favourites/:userId")
.get(usersController.getFavourites)
.post(usersController.addFavourites)
.delete(usersController.deleteFavourite)

router.route('/orders')
.get(usersController.getOrders)
.post(usersController.createOrder)

router.route("/orders/:id")
.get(usersController.getSingleOrder)
.delete(usersController.cancelOrder)


module.exports = router;
