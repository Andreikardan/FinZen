const CategoryRController = require("../controllers/CategoryR.controller");
const verifyRefreshToken = require("../middleware/verifeRefreshToken");

const router = require("express").Router();

router
  .get("/",verifyRefreshToken, CategoryRController.getAllCategoryRs)
  .post("/", CategoryRController.createCategoryR)
  .put("/", CategoryRController.updateCategoryR)
  .delete("/", CategoryRController.deleteCategoryR);

module.exports = router;
