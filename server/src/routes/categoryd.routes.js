const CategoryDController = require("../controllers/CategoryD.controller");

const router = require("express").Router();

router
  .get("/", CategoryDController.getAllCategoryDs)
  .get("/:id", CategoryDController.getCategoryDById)
  .post("/", CategoryDController.createCategoryD)
  .put("/:id", CategoryDController.updateCategoryD)
  .delete("/:id", CategoryDController.deleteCategoryD);

module.exports = router;
