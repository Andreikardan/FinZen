const CategoryRService = require("../services/CategoryR.service");
const CategoryValidator = require("../utils/CategoryValidator");
const formatResponse = require("../utils/formatResponse");

class CategoryRController {

  static async getAllCategoryRs(req, res) {
    try {
      const {user:{id}} = req.locals
      if(id === undefined){
        res.status(404).json(formatResponse(404, "Где твои куки?"));
      }
      const categoryRs = await CategoryRService.getAll(id);
      if (!categoryRs?.length) {
        return res.status(200).json(formatResponse(200, "Нет категорий по доходам", []));
      }
      return res.status(200).json(formatResponse(200, "Все ваши категории по расходам", categoryRs));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createCategoryR(req, res) {
    try {
      const { valid, error } = CategoryValidator.validateCreate(req.body);
      if (!valid) {
        return res.status(400).json(formatResponse(400, error, null, error));
      }
      req.body.borderColor = 'red'
      const newCategoryR = await CategoryRService.create(req.body);
      if (!newCategoryR) {
        return res.status(400).json(formatResponse(400, `Категория не создалась`, null));
      }
      res.status(201).json(formatResponse(201, "Категория создалась", newCategoryR));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateCategoryR(req, res) {
    try {
      const { id } = req.body;
      const oldCategoryR = await CategoryRService.getById(+id)
      if(!oldCategoryR){
        return res.status(404).json(formatResponse(404, 'Категория не найдена', null));
      }
      delete req.body.id
      const { valid, error } = CategoryValidator.validateUpdate(req.body);
      if (!valid) {
        return res.status(400).json(formatResponse(400, error, null));
      }
      const updatedCategoryR = await CategoryRService.update(oldCategoryR, req.body);
      if (!updatedCategoryR) {
        return res.status(404).json(formatResponse(404, `Что то пошло не по плану`));
      }
      res.status(200).json(formatResponse(200, "Успешное обновление", updatedCategoryR));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteCategoryR(req, res) {
    try {
      const {id} = req.body
      const oldCategoryR = await CategoryRService.getById(+id);
      if (!oldCategoryR) {
        return res.status(404).json(formatResponse(404, `Категории не существует`), null);
      }
      const result = await CategoryRService.delete(oldCategoryR)
      if (!result){
         return res.status(400).json(formatResponse(400, 'Что то пошло не по плану'), null)
      }
      res.status(200).json(formatResponse(200, `Категория удалена`, result));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }
}
module.exports = CategoryRController;
