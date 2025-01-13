const CategoryDService = require("../services/CategoryD.service");
const CategoryValidator = require("../utils/CategoryValidator");
const formatResponse = require("../utils/formatResponse");

class CategoryDController {

  static async getAllCategoryDs(req, res) {
    try {
      const {user:{id}} = res.locals
      if(id === undefined){
        res.status(404).json(formatResponse(404, "Где твои куки?", null, 'Где твои куки?'));
      }
      const categoryDs = await CategoryDService.getAll(id);
      if (!categoryDs?.length) {
        return res.status(200).json(formatResponse(200, "Нет категорий по доходам", []));
      }
      return res.status(200).json(formatResponse(200, "Все ваши категории по доходам", categoryDs));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createCategoryD(req, res) {
    try {
      const { valid, error } = CategoryValidator.validateCreate(req.body);
      if (!valid) {
        return res.status(400).json(formatResponse(400, error, null, error));
      }
      req.body.borderColor = 'green'
      const newCategoryD = await CategoryDService.create(req.body);
      if (!newCategoryD) {
        return res.status(400).json(formatResponse(400, `Категория не создалась`, null));
      }
      res.status(201).json(formatResponse(201, "Категория создалась", newCategoryD));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateCategoryD(req, res) {
    try {
      const { id } = req.body;
      const categoryD = await CategoryDService.getById(+id)
      if(!categoryD){
        return res.status(404).json(formatResponse(404, 'Категория не найдена', null));
      }
      delete req.body.id
      const { valid, error } = CategoryValidator.validateUpdate(req.body);
      if (!valid) {
        return res.status(400).json(formatResponse(400, error, null));
      }
      const updatedCategoryD = await CategoryDService.update(categoryD, req.body);
      if (!updatedCategoryD) {
        return res.status(404).json(formatResponse(404, `Что то пошло не по плану`));
      }
      res.status(200).json(formatResponse(200, "Успешное обновление", updatedCategoryD));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteCategoryD(req, res) {
    try {
      const {id} = req.body
      const oldCategoryD = await CategoryDService.getById(+id);
      if (!oldCategoryD) {
        return res.status(404).json(formatResponse(404, `Категории не существует`, null));
      }
      const result = await CategoryDService.delete(oldCategoryD)
      if (!result){
         return res.status(400).json(formatResponse(400, 'Что то пошло не по плану', null))
      }
      res.status(200).json(formatResponse(200, `Категория удалена`, result));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }
}
module.exports = CategoryDController;
