const CategoryDService = require("../services/CategoryD.service");
const CategoryDValidator = require("../utils/CategoryDValidator");
const formatResponse = require("../utils/formatResponse");

class CategoryDController {
  static async getAllCategoryDs(req, res) {
    try {
      const categoryDs = await CategoryDService.get();
      if (categoryDs.length === 0 || !categoryDs) {
        return res
          .status(200)
          .json(formatResponse(200, "No categories found", []));
      }

      return res.status(200).json(formatResponse(200, "success", categoryDs));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getCategoryDById(req, res) {
    const { id } = req.params; 

    try {
      const categoryD = await CategoryDService.getById(+id);

      if (!categoryD) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", categoryD));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createCategoryD(req, res) {
    const { name, icon, borderColor, budget_id } = req.body; //!

    const { isValid, error } = CategoryDValidator.validate({ name, icon });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const newCategoryD = await CategoryDService.create({
        name,
        icon,
        borderColor,
        budget_id //!
      });
      if (!newCategoryD) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new category`));
      }
      res.status(201).json(formatResponse(201, "success", newCategoryD));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateCategoryD(req, res) {
    const { id } = req.params; 
    const { name, icon, borderColor, budget_id } = req.body; //!

    const { isValid, error } = CategoryDValidator.validate({ name, icon });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
    //!   const categoryDToUpdate = await CategoryDService.getById(+id);
    //   if (categoryDToUpdate.budget_id !== budget.id) {
    //     
    //     return res
    //       .status(400)
    //       .json(
    //         formatResponse(
    //           400,
    //           `No rights to update category with id ${id}`,
    //           null,
    //           `No rights to update category with id ${id}`
    //         )
    //       );
    //!   }

      const updatedCategoryD = await CategoryDService.update(+id, {
        name,
        icon,
        borderColor,
        budget_id
      });

      if (!updatedCategoryD) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedCategoryD));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteCategoryD(req, res) {
    const { id } = req.params;

    try {
    //!    const categoryDToDelete = await CategoryDService.getById(+id);

    //   if (categoryDToDelete.budget_id !== budget.id) {
    //     return res
    //       .status(400)
    //       .json(
    //         formatResponse(
    //           400,
    //           `No rights to delete category with id ${id}`,
    //           null,
    //           `No rights to delete category with id ${id}`
    //         )
    //       );
    //!   } 

      const deletedCategoryD = await CategoryDService.delete(+id);

      if (!deletedCategoryD) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200);
      res
        .status(200)
        .json(
          formatResponse(
            200,
            `Category with id ${id} successfully deleted`,
            deletedCategoryD
          )
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}
module.exports = CategoryDController;
