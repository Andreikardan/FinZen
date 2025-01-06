const UserController = require("../controllers/User.controller");
const verifyRefreshToken = require("../middleware/verifeRefreshToken");
const router = require("express").Router();

router
  .get("/refreshToken", verifyRefreshToken, UserController.refreshToken)
  .post("/signIn", UserController.signIn)
  .post("/signUp", UserController.signUp)
  .get("/signOut", UserController.signOut);

module.exports = router;
