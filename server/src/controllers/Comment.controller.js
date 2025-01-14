const CommentService = require("../services/Comments.service");
const formatResponse = require("../utils/formatResponse");

class CommentController {
  static async update(req, res) {
    // const { id } = req.params;
    const { id, text } = req.body;

    try {
      const updateBudget = await CommentService.update(id, text);
      if (!updateBudget) {
        return res.status(404).json(formatResponse(404, "Budget not found"));
      }
      return res
        .status(200)
        .json(formatResponse(200, "Success updated", updateBudget));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async create(req, res) {
    try {
      const newComment = await CommentService.create(req.body);
      if (!newComment) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new comment`));
      }
      res.status(201).json(formatResponse(201, "success", newComment));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async delete(req, res) {
    
    const { id } = req.params;
    try {
      const deleteComment = await CommentService.delete(id);
      if(!deleteComment){
        return res
        .status(404)
        .json(formatResponse(404, `Comment with id ${id} not found`));
      }
      res.status(200);
      res
        .status(200)
        .json(
          formatResponse(
            200,
            `Comment deleted`,
            deleteComment
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
module.exports = CommentController;
