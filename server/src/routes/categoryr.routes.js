const CategoryRController = require("../controllers/CategoryD.controller");
const verifyRefreshToken = require("../middleware/verifeRefreshToken");

const router = require("express").Router();

router
  .get("/",verifyRefreshToken, CategoryRController.getAllCategoryDs)
  .post("/", CategoryRController.createCategoryD)
  .put("/", CategoryRController.updateCategoryD)
  .delete("/", CategoryRController.deleteCategoryD);

module.exports = router;
