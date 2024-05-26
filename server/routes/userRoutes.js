const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middlewares/verifyJWT");
const rateLimiter = require("../middlewares/rateLimiter");

router.use(verifyJWT);

router.route("/").get(rateLimiter, usersController.getUserInfo);

router.route("/edit").put(usersController.editUserInfo);

router
  .route("/address/:userId")
  .get(usersController.getAddresses)
  .post(rateLimiter, usersController.addAddress);

router
  .route("/address/:userId/:addressId")
  .get(usersController.getSingleAddress)
  .put(rateLimiter, usersController.editAddress)
  .delete(rateLimiter, usersController.deleteAddress);

router
  .route("/favourites/:userId")
  .get(usersController.getFavourites)
  .post(usersController.addFavourites)
  .delete(usersController.deleteFavourite);

router.route("/orders").post(usersController.createOrder);

router.route("/orders/:userId").get(usersController.getOrders);

router.route("/orders/:id").get(usersController.getSingleOrder);

router.route("/orders/cancel/:id").delete(usersController.cancelOrder);

module.exports = router;
