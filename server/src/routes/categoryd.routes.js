const CategoryDController = require("../controllers/CategoryD.controller");
const verifyRefreshToken = require("../middleware/verifeRefreshToken");

const router = require("express").Router();

router
  .get("/",verifyRefreshToken, CategoryDController.getAllCategoryDs)
  .post("/", CategoryDController.createCategoryD)
  .put("/", CategoryDController.updateCategoryD)
  .delete("/", CategoryDController.deleteCategoryD);

module.exports = router;
