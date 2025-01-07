const CategoryRService = require("../services/CategoryR.service");
const CategoryRValidator = require("../utils/CategoryRValidator");
const formatResponse = require("../utils/formatResponse");

class CategoryRController {
  static async getAllCategoryRs(req, res) {
    try {
      const categoryRs = await CategoryRService.get();
      if (categoryRs.length === 0 || !categoryRs) {
        return res
          .status(200)
          .json(formatResponse(200, "No categories found", []));
      }

      return res.status(200).json(formatResponse(200, "success", categoryRs));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getCategoryRById(req, res) {
    const { id } = req.params; //!

    try {
      const categoryR = await CategoryRService.getById(+id);

      if (!categoryR) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", categoryR));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createCategoryR(req, res) {
    const { name, icon, borderColor, budget_id } = req.body; //!

    const { isValid, error } = CategoryRValidator.validate({ name, icon });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const newCategoryR = await CategoryRService.create({
        name,
        icon,
        borderColor,
        budget_id //!
      });
      if (!newCategoryR) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new category`));
      }
      res.status(201).json(formatResponse(201, "success", newCategoryR));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateCategoryR(req, res) {
    const { id } = req.params; 
    const { name, icon, borderColor, budget_id } = req.body; //!

    const { isValid, error } = CategoryRValidator.validate({ name, icon });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
    //!   const categoryRToUpdate = await CategoryRService.getById(+id);

    //   if (categoryRToUpdate.budget_id !== budget.id) {
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

      const updatedCategoryR = await CategoryRService.update(+id, {
        name,
        icon,
        borderColor,
        budget_id
      });

      if (!updatedCategoryR) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedCategoryR));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteCategoryR(req, res) {
    const { id } = req.params;

    try {
    //!    const categoryRToDelete = await CategoryRService.getById(+id);

    //   if (categoryRToDelete.budget_id !== budget.id) {
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

      const deletedCategoryR = await CategoryRService.delete(+id);

      if (!deletedCategoryR) {
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
            deletedCategoryR
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
module.exports = CategoryRController;
