const { TransactionComment } = require("../db/models");

class CommentService {
  static async update(id, text) {
    const comment = await TransactionComment.findOne({ where: { id: id } });
    if (comment) {
      comment.text = text;
      await comment.save();
    }
    return comment;
  }
  static async create(data) {
    return await TransactionComment.create(data);
  }
  static async delete(id) {
    const deleteComment = await TransactionComment.findByPk(id);
    if (deleteComment) {
      await deleteComment.destroy();
    }
    return deleteComment;
  }
}
module.exports = CommentService;
