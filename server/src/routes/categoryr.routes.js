const CategoryRController = require("../controllers/CategoryR.controller");

const router = require("express").Router();

router
  .get("/", CategoryRController.getAllCategoryRs)
  .get("/:id", CategoryRController.getCategoryRById)
  .post("/", CategoryRController.createCategoryR)
  .put("/:id", CategoryRController.updateCategoryR)
  .delete("/:id", CategoryRController.deleteCategoryR);

module.exports = router;
